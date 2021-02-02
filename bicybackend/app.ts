import { Backend } from "kuzzle";
import registerControllers from "./controllers/registerControllers";

const app = new Backend("bicybackend");

registerControllers(app);

app
  .start()
  .then(() => {
    app.log.info("Application started");
  })
  .catch(console.error);
