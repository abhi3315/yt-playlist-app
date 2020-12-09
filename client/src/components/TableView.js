import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import LaunchIcon from "@material-ui/icons/Launch";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import DetailModal from "./DetailModal";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(7),
  },
  pointer: {
    cursor: "pointer",
  },
}));

export default function TableView(props) {
  const classes = useStyles();
  const { rows } = props;
  const [modal, setModal] = React.useState(false);
  const [clickedRow, setClickedRow] = React.useState({});

  const handleNewTab = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  const toggleModal = () => setModal((prevState) => !prevState);

  const handleRowClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
    toggleModal();
  };

  return (
    <React.Fragment>
      {rows.length ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Quality</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub-Category</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Total Videos</TableCell>
                <TableCell>Watch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={(e) => handleRowClick(e, row)}
                  className={classes.pointer}
                >
                  <TableCell>
                    <Avatar
                      alt="Thumbnail"
                      src={row.playlistThumbnail}
                      variant="rounded"
                      className={classes.large}
                    />
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.language}</TableCell>
                  <TableCell>{row.quality}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.subCategory}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.totalVideos}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleNewTab(e, row.playlistLink)}
                    >
                      <LaunchIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <center>
          <h2>No Playlists Found!</h2>
        </center>
      )}
      <DetailModal
        playlist={clickedRow}
        open={modal}
        toggleModal={toggleModal}
      />
    </React.Fragment>
  );
}
