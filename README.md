
## Egg-Sentry

Sentry Plugin for Eggjs

### About

This module is to helper developers setup sentry with least work.

### Getting Started

Install egg-sentry as an npm module and save it to your package.json file as a development dependency:
```
npm install --save egg-sentry
```

Add sentry configuration:
```js
// config/config.default.js

exports.sentry = {
  dsn: 'https://819e74a6e948468b9740680cfa87986b:38aaa0c0d51e463597493c250ff11f83@sentry.io/246025',
};

// config/plugin.js

exports.sentry = {
  enable: true,
  package: 'egg-sentry',
};

```
Replace the `dsn` with your own one, get details at [Sentry](https://docs.sentry.io/clients/node/).

From now on, expections are able to submit to sentry. What if we wanna more custom information, such as logined user?

To get a rich [context](https://docs.sentry.io/learn/context/), implemet [Egg Service](https://eggjs.org/zh-cn/basics/service.html#container) in `app/service/sentry.js` file and there are four member properties or methods are supported.

```js
// app/service/sentry.js

'use strict';

const Service = require('egg').Service;

class SentryService extends Service {
  /**
   * filter errors need to be submitted to sentry
   *
   * @param {any} err error
   * @return {boolean} true for submit, default true
   * @memberof SentryService
   */
  judgeError(err) {
    // ignore HTTP Error
    return !(err.status && err.status > 500);
  }
  
  // user information
  get user() {
    return this.ctx.session.user;
  }

  get extra() {
    return {
      ip: this.ctx.ip,
      payload: this.ctx.request.body,
    };
  }

  get tags() {
    return {
      url: this.ctx.request.url,
    };
  }
}

module.exports = SentryService;

```

These infomation would be automaticlly injected into error context.

## Bootstrap

Replace the `dsn` in `test/fixtures/apps/sentry-test/config/config.unittest.js` and then run `npm start` to see what would happend.