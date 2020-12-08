import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles({
  width: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer(props) {
  const { isOpen, toggleDrawer } = props;
  return (
    <React.Fragment>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer}>
        <DropzoneArea />
      </Drawer>
    </React.Fragment>
  );
}
