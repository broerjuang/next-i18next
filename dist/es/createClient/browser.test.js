import createClientBrowser from './browser';
const config = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  use: []
};
describe('createClientBrowser', () => {
  it('returns a browser client', () => {
    const client = createClientBrowser(config);
    expect(typeof client.initPromise.then).toEqual('function');
    expect(typeof client.i18n.addResource).toEqual('function');
    expect(typeof client.i18n.translator).toEqual('object');
    expect(client.i18n.options.defaultLocale).toEqual(config.defaultLocale);
    expect(client.i18n.options.locales).toEqual(config.locales);
  });
});