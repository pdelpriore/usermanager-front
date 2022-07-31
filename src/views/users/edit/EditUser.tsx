import { gql, useMutation } from "@apollo/client";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Form from "../../../components/form/Form";
import { userEditInputItems } from "../../../data/form/FormData";
import showMessage from "../../../shared/showMessage";
import { GET_USERS } from "../list/Users";

const EDIT_USER = gql`
  mutation EditUser($id: Float!, $email: String!, $password: String!) {
    editUser(id: $id, email: $email, password: $password)
  }
`;

type TState = {
  id: number;
  email: string;
  password: string;
};

interface ILocation {
  state: TState;
}

const EditUser: React.FC = () => {
  const {
    state: { id, ...rest },
  } = useLocation() as unknown as ILocation;
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({ ...rest });

  const [editUser, { loading, error }] = useMutation(EDIT_USER, {
    onCompleted: (data) => {
      if (data?.editUser) navigate(-1);
    },
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput((input) => ({ ...input, [e.target.name]: e.target.value }));

  const handleEditUser = () => {
    editUser({ variables: { id, ...userInput } });
  };

  if (error) showMessage({ message: error.message });

  return (
    <Box padding={10}>
      <Form>
        {userEditInputItems.map((props, index) => (
          <TextField
            key={index}
            variant="standard"
            onChange={handleInputChange}
            value={userInput[props.name as keyof typeof userInput] || ""}
            {...props}
          />
        ))}
      </Form>
      <Box sx={{ height: 20 }} />
      <Box display="flex" justifyContent="center" onClick={handleEditUser}>
        {!loading ? (
          <Button
            disabled={Object.values(userInput).some(
              (value) => value.length === 0
            )}
          >
            Edytuj
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default EditUser;