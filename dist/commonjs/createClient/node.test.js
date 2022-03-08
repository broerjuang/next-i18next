"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _node = _interopRequireDefault(require("./node"));

var config = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  use: []
};
describe('createClientNode', function () {
  var client = (0, _node["default"])(config);
  it('returns a node client', function () {
    expect((0, _typeof2["default"])(client.initPromise.then)).toEqual('function');
    expect((0, _typeof2["default"])(client.i18n.addResource)).toEqual('function');
    expect((0, _typeof2["default"])(client.i18n.translator)).toEqual('object');
    expect(client.i18n.options.defaultLocale).toEqual(config.defaultLocale);
    expect(client.i18n.options.locales).toEqual(config.locales);
    expect(client.i18n.options.isClone).not.toEqual(true);
  });
  describe('createClientNode a second time should return a clone of i18next', function () {
    it('returns a node client', function () {
      var secondClient = (0, _node["default"])(config);
      expect((0, _typeof2["default"])(secondClient.initPromise.then)).toEqual('function');
      expect((0, _typeof2["default"])(secondClient.i18n.addResource)).toEqual('function');
      expect((0, _typeof2["default"])(secondClient.i18n.translator)).toEqual('object');
      expect(secondClient.i18n.options.defaultLocale).toEqual(config.defaultLocale);
      expect(secondClient.i18n.options.locales).toEqual(config.locales);
      expect(secondClient.i18n.options.isClone).toEqual(true);
      expect(secondClient).not.toEqual(client);
      expect(secondClient.store).toEqual(client.store);
    });
  });
});