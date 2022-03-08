"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _browser = _interopRequireDefault(require("./browser"));

var config = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  use: []
};
describe('createClientBrowser', function () {
  it('returns a browser client', function () {
    var client = (0, _browser["default"])(config);
    expect((0, _typeof2["default"])(client.initPromise.then)).toEqual('function');
    expect((0, _typeof2["default"])(client.i18n.addResource)).toEqual('function');
    expect((0, _typeof2["default"])(client.i18n.translator)).toEqual('object');
    expect(client.i18n.options.defaultLocale).toEqual(config.defaultLocale);
    expect(client.i18n.options.locales).toEqual(config.locales);
  });
});