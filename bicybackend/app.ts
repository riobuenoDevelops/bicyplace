import { Backend } from "kuzzle";
import createDatabase from "./lib/db";
import registerControllers from "./controllers/registerControllers";

const app = new Backend("bicybackend");

registerControllers(app);

app
  .start()
  .then(() => {
    createDatabase(app);
    app.log.info("Application started");
  })
  .catch(console.error);
