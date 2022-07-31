import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { red } from "@mui/material/colors";
import { Delete, Edit, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router";
import RemoveUserDialog from "../user/RemoveUserDialog";
import BarChart from "../chart/BarChart";

type TProfile = {
  login?: string;
  firstName?: string;
  lastName?: string;
};

type TChart = {
  stepNumber: number;
  createdAt: string;
};

interface IUserTableRow {
  id: number;
  email: string;
  password: string;
  type: string;
  profile: TProfile;
  charts: TChart[];
}

const UserTableRow: React.FC<IUserTableRow> = ({
  id,
  email,
  password,
  type,
  profile: { login, firstName, lastName },
  charts,
}) => {
  const navigate = useNavigate();
  const [isRowOpen, setRowOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleRowOpen = () => setRowOpen(!isRowOpen);

  const handleEditUser = () =>
    navigate("/user/edit", { state: { id, email, password } });

  const handleAddActivity = () =>
    navigate("/user/activity/create", {
      state: {
        id,
        lastCreatedAt: Date.parse(charts.at(-1)?.createdAt as string),
      },
    });

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Tooltip
            title={isRowOpen ? "Schowaj" : "Pokaż szczegóły"}
            placement="top-end"
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleRowOpen}
            >
              {isRowOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body1">{email}</Typography>
        </TableCell>
        <TableCell>
          <Box padding={2} borderRadius={2} sx={{ backgroundColor: "#E9ECEF" }}>
            <Typography variant="body1">{type}</Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Tooltip title="edytuj" placement="top">
              <IconButton onClick={handleEditUser}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="usuń" placement="top">
              <IconButton onClick={handleDialogOpen}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={isRowOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: 5 }}>
              <Typography variant="h6">Dane użytkownika :</Typography>
              <Box style={{ height: 20 }} />
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#E9ECEF",
                  borderRadius: 2,
                }}
                elevation={0}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {login?.charAt(0).toUpperCase() ||
                        firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={login || firstName}
                  subheader={lastName}
                />
                <CardContent>
                  <Stack direction="row" spacing={1}>
                    <Lock />
                    <Typography variant="body1">{password}</Typography>
                  </Stack>
                </CardContent>
              </Card>
              <Box style={{ height: 30 }} />
              <Stack direction="row" spacing={2}>
                <Typography variant="h6">
                  Liczba kroków danego dnia :
                </Typography>
                <Button onClick={handleAddActivity}>Dodaj kroki</Button>
              </Stack>
              <Box style={{ height: 20 }} />
              {charts.length === 0 ? (
                <Typography variant="body1">
                  Brak ostatnio dodanych kroków
                </Typography>
              ) : (
                <Box style={{ width: 600, height: 350 }}>
                  <BarChart charts={charts} />
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <RemoveUserDialog
        id={id}
        name={(login || firstName) as string}
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
};

export default UserTableRow;
