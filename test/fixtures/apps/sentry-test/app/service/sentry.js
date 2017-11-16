'use strict';

const Service = require('egg').Service;

class SentryService extends Service {
  /**
   * filter errors need to be submitted to sentry
   *
   * @param {any} err error
   * @return {boolean} submit or not
   * @memberof SentryService
   */
  judgeError(err) {
    // ignore HTTP Error
    return !(err.status && err.status > 500);
  }

  /**
   * user information
   *
   * @readonly
   * @return {object} user
   * @memberof SentryService
   */
  get user() {
    return this.ctx.session.user;
  }

  /**
   * extra information
   *
   * @readonly
   * @return {object} extra
   * @memberof SentryService
   */
  get extra() {
    return {
      ip: this.ctx.ip,
      payload: this.ctx.request.body,
    };
  }

  /**
   * tags
   *
   * @readonly
   * @return {object} tags
   * @memberof SentryService
   */
  get tags() {
    return {
      url: this.ctx.request.url,
    };
  }
}

module.exports = SentryService;
