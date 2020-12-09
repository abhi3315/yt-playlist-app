import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import { convertTime } from "../utils";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: "relative",
  },
  width75vh: {
    width: "60vw",
  },
  avatar: {
    width: theme.spacing(40),
    height: theme.spacing(20),
    margin: "10px",
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    right: "0",
    top: "0",
  },
}));

export default function DetailModal(props) {
  const classes = useStyles();
  const { open, toggleModal, playlist } = props;
  const [videoIndex, setVideoIndex] = React.useState(0);

  const handleAvatarClick = (url) => window.open(url, "_blank");
  const nextVideo = () =>
    setVideoIndex((prevState) =>
      playlist.videos.length - 1 ? prevState + 1 : prevState
    );
  const previousVideo = () => {
    setVideoIndex((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };
  const closeModal = () => {
    setVideoIndex(0);
    toggleModal();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <IconButton onClick={closeModal} className={classes.closeBtn}>
            <CancelIcon />
          </IconButton>
          <h2>{playlist.title}</h2>
          <p>
            <b>Playlist Id: </b>
            {playlist.playlistId}
          </p>
          <p className={classes.width75vh}>
            <b>Description: </b>
            {playlist.playlistDesc && playlist.playlistDesc.slice(0, 300)}
            {playlist.playlistDesc &&
              playlist.playlistDesc.length > 300 &&
              "..."}
          </p>
          <Divider />
          {playlist && playlist.videos && (
            <center>
              <h3>
                Videos ({playlist.videos.length}/{videoIndex + 1})
              </h3>
              <section className={classes.grid}>
                <IconButton disabled={videoIndex === 0} onClick={previousVideo}>
                  <ArrowBackIcon />
                </IconButton>
                <Avatar
                  alt="Thumbnail"
                  src={playlist.videos[videoIndex].thumbnail}
                  variant="rounded"
                  className={classes.avatar}
                  onClick={() =>
                    handleAvatarClick(playlist.videos[videoIndex].url)
                  }
                />
                <IconButton
                  onClick={nextVideo}
                  disabled={videoIndex === playlist.videos.length - 1}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </section>
              <p>
                <b>Video Title: </b>
                {playlist.videos[videoIndex].title}
              </p>
              <p>
                <b>Video Id: </b>
                {playlist.videos[videoIndex].id}
              </p>
              <p>
                <b>Duration: </b>
                {convertTime(playlist.videos[videoIndex].length)} seconds
              </p>
            </center>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
