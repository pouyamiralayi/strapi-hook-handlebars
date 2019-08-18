const path = require('path');
const hbs = require('koa-handlebars')
// const hbs = require('koa-hbs')
const co = require('co')

module.exports = strapi => {
  const hook = {
    defaults: {
      viewsDir: path.join(strapi.config.paths.views),
      extension: 'hbs',
      partialsDir: path.join(strapi.config.paths.views, 'partials'),
      layoutsDir: path.join(strapi.config.paths.views, 'layouts'),
      defaultLayout: 'default',
      cache: true,
      // viewPath: path.join(strapi.config.appPath, strapi.config.paths.views),
      // extname: 'hbs',
      // partialsPath: path.join(strapi.config.appPath, strapi.config.paths.views, 'partials'),
      // layoutsPath: path.join(strapi.config.appPath, strapi.config.paths.views, 'layouts'),
      // defaultLayout: 'default.hbs',
      // disableCache: false,
    },
    initialize: cb => {
      console.log(path.join(strapi.config.appPath, strapi.config.paths.views, 'layouts'))
      // Force cache mode in production
      if (strapi.config.environment === 'production') {
        strapi.config.hook.settings.handlebars.disableCache= false;
      }
      strapi.app.use(hbs(strapi.config.hook.settings.handlebars));
      strapi.app.context.render = co.wrap(strapi.app.context.render);

      cb()
    }
  };
  return hook;
};
