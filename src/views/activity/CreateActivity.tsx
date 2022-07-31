import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import moment from "moment";
import Form from "../../components/form/Form";
import { activityFormItems } from "../../data/form/FormData";
import { GET_USERS } from "../users/list/Users";

const CREATE_ACTIVITY = gql`
  mutation AddChart($id: Float!, $stepNumber: Float!) {
    addChart(id: $id, stepNumber: $stepNumber)
  }
`;

type TState = {
  id: number;
  lastCreatedAt?: Date;
};

interface ILocation {
  state: TState;
}

const CreateActivity: React.FC = () => {
  const {
    state: { id, lastCreatedAt },
  } = useLocation() as unknown as ILocation;
  const navigate = useNavigate();

  const now = new Date();

  const [stepNumber, setStepNumber] = useState(0);

  const [createActivity, { loading }] = useMutation(CREATE_ACTIVITY, {
    onCompleted: (data) => {
      if (data?.addChart) navigate(-1);
    },
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStepNumber(parseInt(e.target.value));

  const handleCreateActivity = () =>
    createActivity({ variables: { id, stepNumber } });

  const handleGoBack = () => navigate("/user/list", { replace: true });

  const isDisabled =
    Boolean(lastCreatedAt) && moment(lastCreatedAt).isSame(now, "day");

  return (
    <Box padding={10}>
      <Box style={{ height: 5 }} />
      <Typography align="center" variant="h6">
        Liczbę zrobionych kroków można dodać tylko raz dziennie
      </Typography>
      <Box style={{ height: 30 }} />
      <Form>
        {activityFormItems.map((props, index) => (
          <TextField
            key={index}
            variant="standard"
            onChange={handleInputChange}
            value={stepNumber || ""}
            disabled={isDisabled}
            {...props}
          />
        ))}
      </Form>
      <Box sx={{ height: 20 }} />
      <Box display="flex" justifyContent="center">
        {!loading ? (
          <Stack direction="row" spacing={1}>
            <Button disabled={isDisabled} onClick={handleCreateActivity}>
              Zapisz
            </Button>
            <Button onClick={handleGoBack}>Wróć</Button>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default CreateActivity;
