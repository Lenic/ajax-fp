import { AjaxCreation } from './types';

export const Core: AjaxCreation = (executor, plugins, defaultRequestNextCallback, defaultResponseNextCallback) => ({
  push(plugin) {
    return Core(executor, [...plugins, plugin], defaultRequestNextCallback, defaultResponseNextCallback);
  },
  send(config, body) {
    return Promise.resolve(
      plugins.reduceRight(
        (acc, x) => () => x.onRequest(acc, config, body),
        () => defaultRequestNextCallback(config, body)
      )()
    )
      .then(executor)
      .then(v =>
        Promise.resolve(
          plugins.reduceRight(
            (acc, x) => () => x.onResponse(v, acc),
            () => defaultResponseNextCallback(v)
          )()
        )
      );
  }
});
