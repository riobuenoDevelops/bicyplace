import { throws } from "assert";
import { Backend, Controller, KuzzleRequest } from "kuzzle";

class UserController extends Controller {
  constructor(app: Backend) {
    super(app);

    this.definition = {
      actions: {
        createUser: {
          handler: this.createUser,
          http: [
            {
              verb: "post",
              path: "user",
            },
          ],
        },
        updateUserInformation: {
          handler: this.updateUserInformation,
          http: [
            {
              verb: "put",
              path: "user/information/:id",
            },
          ],
        },
        updateUserCredentials: {
          handler: this.updateCredentials,
          http: [
            {
              verb: "put",
              path: "user/credentials/:id",
            },
          ],
        },
        getUser: {
          handler: this.getUser,
          http: [
            {
              verb: "get",
              path: "user/:id",
            },
          ],
        },
        deleteUser: {
          handler: this.deleteUser,
          http: [
            {
              verb: "delete",
              path: "user/:id",
            },
          ],
        },
        login: {
          handler: this.login,
          http: [
            {
              verb: "post",
              path: "user/login",
            },
          ],
        },
      },
    };
  }

  async getUser(request: KuzzleRequest) {
    const { id } = request.input.args;

    this.app.log.info(`Id: ${id}`);

    try {
      return await this.app.sdk.security.getUser(id);
    } catch (err) {
      this.app.log.error(err.message);
    }
  }

  async login(request: KuzzleRequest) {
    const { username, password } = request.input.body;

    return await this.app.sdk.auth.login("local", {
      username,
      password,
    });
  }

  async createUser(request: KuzzleRequest) {
    const { email, password, fullName, username, typeOf } = request.input.body;
    const body = {
      content: {
        profileIds: [typeOf],
        fullName,
        email,
      },
      credentials: {
        local: {
          username,
          password,
        },
      },
    };

    return await this.app.sdk.security.createUser(username, body);
  }

  async updateUserInformation(request: KuzzleRequest) {
    const { id } = request.input.args;
    const { newFullName } = request.input.body;

    if (newFullName) {
      return await this.app.sdk.security.updateUser(id, {
        fullName: newFullName,
      });
    }
  }

  async updateCredentials(request: KuzzleRequest) {
    const { id } = request.input.args;
    const { username, newPassword } = request.input.body;

    return await this.app.sdk.security.updateCredentials("local", id, {
      password: newPassword,
    });
  }

  async deleteUser(request: KuzzleRequest) {}
}

export default UserController;
