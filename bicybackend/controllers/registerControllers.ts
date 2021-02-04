import UserController from "./userController";

function registerControllers(app) {
  app.controller.use(new UserController(app));
}

export default registerControllers;
