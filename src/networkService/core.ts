import { AjaxCreation, ComplexObject, AjaxConfig, AjaxParameter, NextCallback } from './types';

export const Core: AjaxCreation = (executor, plugins, options) => ({
  push(plugin) {
    return Core(executor, [...plugins, plugin], options);
  },
  send<T extends ComplexObject>(config: AjaxConfig, data?: AjaxParameter): Promise<T> {
    const { requestAction, responseAction } = options;
    const composeBefore: NextCallback = plugins.reduceRight(
      (acc, x) => () => x.onRequest(acc, config, data),
      () => requestAction(config, data)
    );

    return Promise.resolve(composeBefore())
      .then(executor)
      .then(v => {
        const next: NextCallback = plugins.reduceRight(
          (acc, x) => () => x.onResponse(acc, v),
          () => responseAction(v)
        );
        return Promise.resolve(next() as T);
      });
  }
});
