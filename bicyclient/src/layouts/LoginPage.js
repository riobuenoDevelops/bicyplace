//dependencies imports
import { useEffect, useState } from "react";
import { Alert, AlertIcon, Center, CloseButton, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

//components imports
import LoginForm from "../components/LoginForm";

//stylesheets and images imports
import "../styles/login.css";

export default function LoginPage({ kuzzleService, setNavHidden }) {
  const history = useHistory();
  const [loginErrors, setLoginErrors] = useState("");

  useEffect(() => {
    setNavHidden(true);
  }, []);

  const hideErrors = () => {
    setLoginErrors("");
  };

  return (
    <Box w="100%" h="100%">
      {loginErrors === "" ? null : (
        <Alert variant="subtle" status="error" w="100%">
          <AlertIcon />
          {loginErrors}
          <CloseButton
            onClick={hideErrors}
            position="absolute"
            top="8px"
            right="8px"
          />
        </Alert>
      )}
      <Center w="100%" h="100%" className="bg-image">
        <LoginForm
          history={history}
          kuzzleService={kuzzleService}
          setLoginErrors={setLoginErrors}
          setNavHidden={setNavHidden}
        />
      </Center>
    </Box>
  );
}
