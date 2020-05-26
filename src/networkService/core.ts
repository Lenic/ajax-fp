import { getNext } from './utils';
import { AjaxCreation, ComplexObject, AjaxConfig, AjaxParameter, NextCallback, ExtraOptions } from './types';

export const Core: AjaxCreation = (executor, plugins, options) => ({
  push(...newPlugins) {
    return Core(executor, [...plugins, ...newPlugins], options);
  },
  send<T extends ComplexObject>(config: AjaxConfig, data?: AjaxParameter, opts?: ExtraOptions): Promise<T> {
    const parameter = data || null;
    const extra: ExtraOptions = { ...opts, ajax: this };
    const { requestAction, responseAction, errorAction } = options;
    const composeBefore: NextCallback = plugins.reduceRight(
      (acc, x) => () => x.onRequest(acc, config, parameter, extra),
      () => requestAction(config, parameter, extra)
    );

    return getNext(composeBefore)
      .then(executor)
      .then(v => {
        const next: NextCallback = plugins.reduceRight(
          (acc, x) => () => x.onResponse(acc, v, config, parameter, extra),
          () => responseAction(v, config, parameter, extra)
        );
        return getNext(next);
      })
      .catch((e: Error) => {
        const next: NextCallback = plugins.reduceRight(
          (acc, x) => () => x.onError(acc, e, config, parameter, extra),
          () => errorAction(e, config, parameter, extra)
        );
        return getNext(next).then(e => Promise.reject(e));
      })
      .then(v => v as T);
  }
});
