import '@babel/polyfill';
import Router from "./services/router";
import Service from './services/service';

Service.register({name: `router`, module: Router});

document.addEventListener(`DOMContentLoaded`, () => {
  const router = new Router();
  router.showWelcome();
});
