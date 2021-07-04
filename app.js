'use strict';

const Sentry = require('@sentry/node');
const assert = require('assert');

module.exports = app => {
  const config = app.config.sentry;

  assert(config.dsn, '[egg-sentry][config] dsn is required');

  Sentry.init({
    dsn: config.dsn,
  });

  app.on('error', (e, ctx) => {
    const {
      user = {}, extra = {}, tags = {}, judgeError = () => true,
    } = app.serviceClasses.sentry ? new app.serviceClasses.sentry(ctx) : {};

    if (!judgeError(e)) {
      return;
    }

    Sentry.setUser(user);
    Sentry.setExtras(extra);
    Sentry.captureException(e, {
      tags,
    });
  });
};
