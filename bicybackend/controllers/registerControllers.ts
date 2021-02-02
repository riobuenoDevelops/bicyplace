import UserController from "./useController";

function registerControllers(app) {
  app.controller.use(new UserController(app));
}

export default registerControllers;
