import { gql, useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../../components/form/Form";
import { userFormItems } from "../../../data/form/FormData";
import showMessage from "../../../shared/showMessage";
import { GET_USERS } from "../list/Users";
import {
  getUserInputKeys,
  getUserInputModel,
} from "./method/getUserInputModel";

const CREATE_ADMIN = gql`
  mutation CreateAdmin(
    $userInput: UserInputType!
    $adminProfileInput: AdminProfileInputType
  ) {
    addUser(userInput: $userInput, adminProfileInput: $adminProfileInput)
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $userInput: UserInputType!
    $userProfileInput: UserProfileInputType
  ) {
    addUser(userInput: $userInput, userProfileInput: $userProfileInput)
  }
`;

interface IUserInput {
  email?: string;
  password?: string;
  type?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
}

enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

const CreateUser: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initUserInput = {
    email: "",
    password: "",
    type: "",
    login: "",
    firstName: "",
    lastName: "",
  };

  const [userInput, setUserInput] = useState(initUserInput);

  const userType = searchParams.get("type") as string;
  const mutation = userType === UserType.ADMIN ? CREATE_ADMIN : CREATE_USER;

  const [createUser, { loading, error }] = useMutation(mutation, {
    onCompleted: (data) => {
      if (data?.addUser) navigate(-1);
    },
    refetchQueries: [{ query: GET_USERS }],
  });

  const formItems = userFormItems[userType as keyof typeof userFormItems];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput((input) => ({ ...input, [e.target.name]: e.target.value }));

  const handleSetInputUserType = () =>
    setUserInput((input) => ({ ...input, type: userType }));

  const handleGeneratePassword = () => {
    const passwordGenerated = Math.random().toString(36).slice(2);
    setUserInput((input) => ({ ...input, password: passwordGenerated }));
  };

  const handleSaveUser = () => {
    const userInputModel = getUserInputModel(userType);

    const variables = Object.fromEntries(
      Object.entries(userInputModel).map(([key, value]) => {
        const inputValue = Object.fromEntries(
          Object.entries(value).map(([key]) => {
            const userInputValue = userInput[key as keyof typeof userInput];
            return [key, userInputValue];
          })
        );
        return [key, inputValue];
      })
    );

    createUser({ variables });
  };

  if (error) showMessage({ message: error.message });

  useEffect(() => {
    if (userType) handleSetInputUserType();
  }, [userType]);

  return (
    <Box padding={10}>
      <Form>
        {formItems.map((props, index) => (
          <TextField
            key={index}
            variant="standard"
            onChange={handleInputChange}
            value={userInput[props.name as keyof IUserInput] || ""}
            {...props}
          />
        ))}
      </Form>
      <Box sx={{ height: 20 }} />
      <Box display="flex" justifyContent="center">
        <Button onClick={handleGeneratePassword}>Wygeneruj hasło</Button>
      </Box>
      <Box sx={{ height: 20 }} />
      <Box display="flex" justifyContent="center" onClick={handleSaveUser}>
        {!loading ? (
          <Button
            disabled={Object.keys(userInput).some((key) => {
              const userInputKeys = getUserInputKeys(userType);
              return (
                userInputKeys.includes(key) &&
                userInput[key as keyof typeof userInput].length === 0
              );
            })}
          >
            Zapisz
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default CreateUser;
