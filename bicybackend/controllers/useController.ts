import { Backend, Controller, KuzzleRequest } from "kuzzle";

class UserController extends Controller {
  constructor(app: Backend) {
    super(app);

    this.definition = {
      actions: {
        getAllUsers: {
          handler: async () => {
            return "";
          },
          http: [{ verb: "get", path: "user" }],
        },
        createUser: {
          handler: async () => {
            return "";
          },
          http: [
            {
              verb: "post",
              path: "user",
            },
          ],
        },
        updateUser: {
          handler: async () => {
            return "";
          },
          http: [
            {
              verb: "put",
              path: "user/:id",
            },
          ],
        },
        getUser: {
          handler: async () => {
            return "";
          },
          http: [
            {
              verb: "get",
              path: "user/:id",
            },
          ],
        },
        deleteUser: {
          handler: async () => {
            return "";
          },
          http: [
            {
              verb: "delete",
              path: "user/:id",
            },
          ],
        },
      },
    };
  }

  async getAllUsers(request: KuzzleRequest) {
    const { email, password, fullName } = request.input.body;

    return await this.app.sdk.security.createRestrictedUser();
  }

  async getUser(request: KuzzleRequest) {}

  async createUser(request: KuzzleRequest) {}

  async updateUser(request: KuzzleRequest) {}

  async deleteUser(request: KuzzleRequest) {}
}

export default UserController;
