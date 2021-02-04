import { useState } from "react";
import { Alert, AlertIcon, Center, CloseButton, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

//
import SignUpForm from "../components/signUpForm";

export default function SignUpPage({ kuzzleService }) {
  const history = useHistory();

  const [loginErrors, setLoginErrors] = useState("");

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
      <Center w="100%" className="sign-up-image">
        <SignUpForm
          history={history}
          kuzzleService={kuzzleService}
          setErrors={setLoginErrors}
        />
      </Center>
    </Box>
  );
}
