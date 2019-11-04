const container = {};

export default class Service {
  static register({name, module}) {
    if (typeof module === `function`) {
      container[name] = module;
    } else {
      throw new Error(`Module is not a function`);
    }
  }

  static discover(name) {
    if (typeof container[name] !== `function`) {
      throw new Error(`No such service with name ${name}`);
    } else {
      return container[name];
    }
  }
}
