"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.concat.js");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _fs = _interopRequireDefault(require("fs"));

var _serverSideTranslations = require("./serverSideTranslations");

var _appWithTranslation = require("./appWithTranslation");

var _server = require("react-dom/server");

var __jsx = _react["default"].createElement;
jest.mock('fs', function () {
  return {
    existsSync: jest.fn(),
    readdirSync: jest.fn()
  };
});
var DummyApp = (0, _appWithTranslation.appWithTranslation)(function () {
  return __jsx("div", null, "Hello world");
});
var props = {
  pageProps: {
    _nextI18Next: {
      initialLocale: 'en-US',
      userConfig: {
        i18n: {
          defaultLocale: 'en',
          locales: ['en', 'fr']
        }
      }
    }
  },
  router: {
    locale: 'en'
  }
};

var renderDummyComponent = function renderDummyComponent() {
  return (0, _server.renderToString)(__jsx(DummyApp, props));
};

describe('serverSideTranslations', function () {
  beforeEach(function () {
    _fs["default"].existsSync.mockReturnValueOnce(false);

    _fs["default"].existsSync.mockReturnValueOnce(true);

    _fs["default"].readdirSync.mockReturnValue([]);
  });
  afterEach(jest.resetAllMocks);
  it('throws if initialLocale is not passed', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect((0, _serverSideTranslations.serverSideTranslations)(undefined)).rejects.toThrow('Initial locale argument was not passed into serverSideTranslations');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('When namespacesRequired is not provided', function () {
    beforeEach(function () {
      _fs["default"].readdirSync.mockImplementation(function (path) {
        return ['common', "namespace-of-".concat(path.split('/').pop())];
      });
    });
    it('returns all namespaces', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var props;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)()('en-US', undefined, {
                i18n: {
                  defaultLocale: 'en-US',
                  locales: ['en-US', 'fr-CA']
                }
              });

            case 2:
              props = _context2.sent;
              expect(_fs["default"].existsSync).toHaveBeenCalledTimes(0);
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(1);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en-US'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                'en-US': {
                  common: {},
                  'namespace-of-en-US': {}
                }
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('returns all namespaces with fallbackLng (as string)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var props;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)()('en-US', undefined, {
                i18n: {
                  defaultLocale: 'fr-BE',
                  fallbackLng: 'fr',
                  locales: ['nl-BE', 'fr-BE']
                }
              });

            case 2:
              props = _context3.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(2);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                'en-US': {
                  common: {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('returns all namespaces with fallbackLng (as array)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var props;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)()('en-US', undefined, {
                i18n: {
                  defaultLocale: 'en-US',
                  fallbackLng: ['en', 'fr'],
                  locales: ['en-US', 'fr-CA']
                }
              });

            case 2:
              props = _context4.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(3);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en-US'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                en: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                'en-US': {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('returns all namespaces with fallbackLng (as object)', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var props;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _serverSideTranslations.serverSideTranslations)()('en-US', undefined, {
                i18n: {
                  defaultLocale: 'nl-BE',
                  fallbackLng: {
                    "default": ['fr'],
                    'nl-BE': ['en']
                  },
                  locales: ['nl-BE', 'fr-BE']
                }
              });

            case 2:
              props = _context5.sent;
              expect(_fs["default"].readdirSync).toHaveBeenCalledTimes(3);
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/en'));
              expect(_fs["default"].readdirSync).toHaveBeenCalledWith(expect.stringMatching('/public/locales/fr'));
              expect(props._nextI18Next.initialI18nStore).toEqual({
                en: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                'en-US': {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                },
                fr: {
                  common: {},
                  'namespace-of-en': {},
                  'namespace-of-en-US': {},
                  'namespace-of-fr': {}
                }
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  it('returns props', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var props;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _serverSideTranslations.serverSideTranslations)()('en-US', [], {
              i18n: {
                defaultLocale: 'en-US',
                locales: ['en-US', 'fr-CA']
              }
            });

          case 2:
            props = _context6.sent;
            expect(props).toEqual({
              _nextI18Next: {
                initialI18nStore: {
                  'en-US': {}
                },
                initialLocale: 'en-US',
                userConfig: {
                  i18n: {
                    defaultLocale: 'en-US',
                    locales: ['en-US', 'fr-CA']
                  }
                }
              }
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('calls reloadResources when reloadOnPrerender option is true', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            renderDummyComponent();

            if (_appWithTranslation.globalI18n) {
              _appWithTranslation.globalI18n.reloadResources = jest.fn();
            }

            _context7.next = 4;
            return (0, _serverSideTranslations.serverSideTranslations)()('en-US', [], {
              i18n: {
                defaultLocale: 'en-US',
                locales: ['en-US', 'fr-CA']
              },
              reloadOnPrerender: true
            });

          case 4:
            expect(_appWithTranslation.globalI18n === null || _appWithTranslation.globalI18n === void 0 ? void 0 : _appWithTranslation.globalI18n.reloadResources).toHaveBeenCalledTimes(1);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('does not call reloadResources when reloadOnPrerender option is false', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            renderDummyComponent();

            if (_appWithTranslation.globalI18n) {
              _appWithTranslation.globalI18n.reloadResources = jest.fn();
            }

            _context8.next = 4;
            return (0, _serverSideTranslations.serverSideTranslations)()('en-US', [], {
              i18n: {
                defaultLocale: 'en-US',
                locales: ['en-US', 'fr-CA']
              },
              reloadOnPrerender: false
            });

          case 4:
            expect(_appWithTranslation.globalI18n === null || _appWithTranslation.globalI18n === void 0 ? void 0 : _appWithTranslation.globalI18n.reloadResources).toHaveBeenCalledTimes(0);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('throws if a function is used for localePath and namespaces are not provided', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var localePathFn, config;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            localePathFn = function localePathFn(locale, namespace, missing) {
              return "".concat(missing, "/").concat(namespace, "/").concat(locale, ".json");
            };

            config = {
              i18n: {
                defaultLocale: 'en',
                locales: ['en']
              },
              localePath: localePathFn,
              ns: ['common']
            };
            _context9.next = 4;
            return expect((0, _serverSideTranslations.serverSideTranslations)()('en-US', undefined, config)).rejects.toMatchObject({
              message: 'Must provide namespacesRequired to serverSideTranslations when using a function as localePath'
            });

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
});