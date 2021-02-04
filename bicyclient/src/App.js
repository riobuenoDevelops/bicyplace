import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
import LoginPage from "./layouts/LoginPage";
import SignUpPage from "./layouts/SignUpPage";
import NavbarLayoutPage from "./layouts/NavbarLayoutPage";

//Services
import KuzzleService from "./services/kuzzle";

async function connect() {
  await KuzzleService.connect();
  console.log("Kuzzle Connected");
}

function App() {
  connect();

  return (
    <Box w="100vw" h="100vh" overflowX="hidden">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage kuzzleService={KuzzleService} />
          </Route>
          <Route path="/signup">
            <SignUpPage kuzzleService={KuzzleService} />
          </Route>
          <NavbarLayoutPage>
            <Route path="/">
              <Box></Box>
            </Route>
          </NavbarLayoutPage>
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default App;
