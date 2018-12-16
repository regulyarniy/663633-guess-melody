import '@babel/polyfill';
import Router from "./services/router";

document.addEventListener(`DOMContentLoaded`, () => {
  const context = {Router};
  Router.showWelcome(undefined, context);
});
