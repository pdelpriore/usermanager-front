import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../config/apollo/ApolloClient";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Users from "../users/list/Users";
import CreateUser from "../users/create/CreateUser";
import EditUser from "../users/edit/EditUser";
import withSnackbar from "../../components/snackbar/withSnackbar";
import CreateActivity from "../activity/CreateActivity";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/user/list" />} />
          <Route path="/user/list" element={<Users />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit" element={<EditUser />} />
          <Route path="/user/activity/create" element={<CreateActivity />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default withSnackbar(App);
