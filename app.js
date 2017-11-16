'use strict';

const Raven = require('raven');
const assert = require('assert');

module.exports = app => {
  const config = app.config.sentry;

  assert(config.dsn, '[egg-sentry][config] dsn is required');

  Raven.config(config.dsn).install();

  app.on('error', (e, ctx) => {
    const {
      user = {}, extra = {}, tags = {}, judgeError = () => true,
    } = new app.serviceClasses.sentry(ctx);

    if (!judgeError(e)) {
      return;
    }

    Raven.setContext({
      user,
      extra,
    });
    Raven.captureException(e, {
      tags,
    });
  });
};
