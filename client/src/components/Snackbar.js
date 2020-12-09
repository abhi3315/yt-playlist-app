import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar(props) {
  const { open, message, handleClose, severity } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
