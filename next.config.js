// next.config.js
module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'tr', 'de', 'fr'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // domains: [
    //   {
    //     domain: "dev.dogukaanyilmaz.com",
    //     defaultLocale: "en",
    //   },
    //   {
    //     domain: "tr.dev.dogukaanyilmaz.com",
    //     defaultLocale: "tr",
    //   },
    // ],
  },
};
