import React from "react";
import Header from "./Header";
import LinearProgress from "@material-ui/core/LinearProgress";
import BulkUploadDrawer from "./BulkUploadDrawer";
import SnackBar from "./Snackbar";
import TableView from "./TableView";
import { getData } from "../utils";

export default function App() {
  const [bulkUploadDrawer, setBulkUploadDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [snackBar, setSnackBar] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [playlists, setPlaylists] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      if (res.error) {
        setError(true);
        setMessage(res.message);
        setSnackBar(true);
        return;
      }
      setPlaylists(res);
      setLoading(false);
    });
  }, []);

  const toggleBulkUploadDrawer = () => {
    setBulkUploadDrawer((prevState) => !prevState);
  };

  const closeSnackBar = () => setSnackBar(false);

  return (
    <div>
      {loading && <LinearProgress color="secondary" />}
      <Header toggleDrawer={toggleBulkUploadDrawer} />
      <BulkUploadDrawer
        setPlaylists={setPlaylists}
        isOpen={bulkUploadDrawer}
        toggleDrawer={toggleBulkUploadDrawer}
        setLoading={setLoading}
      />
      <TableView rows={playlists} />
      <SnackBar
        severity={error ? "error" : "success"}
        open={snackBar}
        handleClose={closeSnackBar}
        message={message}
      />
    </div>
  );
}
