import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import csvToJson from "convert-csv-to-json";
import SnackBar from "./Snackbar";
import { DropzoneArea } from "material-ui-dropzone";
import { postData, getData } from "../utils";

const useStyles = makeStyles({
  pd: {
    padding: "50px 40px",
  },
  mg: {
    marginBottom: 20,
    marginLeft: 10,
    display: "inline-block",
  },
  btnSection: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-around",
  },
});

const csvHeader = [
  "title",
  "level",
  "language",
  "instructor",
  "quality",
  "category",
  "subCategory",
  "subject",
  "playlistLink",
  "playlistId",
];

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const { isOpen, toggleDrawer, setLoading, setPlaylists } = props;
  const [file, setFile] = React.useState(null);
  const [snackBar, setSnackBar] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleFileChange = (files) => {
    setFile(files[0]);
  };
  const handleDeleteFile = () => setFile(null);
  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const data = csvToJson.fieldDelimiter(",").csvStringToJson(text);
      const isValid = Object.keys(data[0]).every((key) =>
        csvHeader.includes(key)
      );
      if (!isValid) {
        setError(true);
        setMessage("CSV file is not valid");
        setSnackBar(true);
        return;
      }
      if (data.length > 20) {
        setError(true);
        setMessage("CSV file should have upto 20 rows");
        setSnackBar(true);
        return;
      }
      setLoading(true);
      postData(data).then((res) => {
        if (res.error) {
          setError(true);
          setMessage(res.message);
          setSnackBar(true);
        } else {
          setError(false);
          setMessage("Successfully uploaded");
          setSnackBar(true);
          getData().then((res) => {
            if (res.error) {
              setError(true);
              setMessage(res.message);
              setSnackBar(true);
            }
            setPlaylists(res);
          });
        }
        setLoading(false);
      });
    };
    reader.readAsText(file);
  };
  const closeSnackBar = () => setSnackBar(false);
  return (
    <React.Fragment>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer}>
        <section className={classes.pd}>
          <Typography className={classes.mg} variant="h5">
            Upload CSV
          </Typography>
          <Link href="/sample.csv" target="_blank" className={classes.mg}>Download Sample CSV</Link>
          <DropzoneArea
            filesLimit={1}
            acceptedFiles={[".csv"]}
            dropzoneText={"Drag and drop a CSV file here or click"}
            onChange={handleFileChange}
            onDelete={handleDeleteFile}
          />
          <section className={classes.btnSection}>
            <Button
              color="primary"
              variant="contained"
              disabled={!file}
              onClick={handleUpload}
            >
              Upload
            </Button>
            <Button
              onClick={toggleDrawer}
              color="secondary"
              variant="contained"
            >
              Cancle
            </Button>
          </section>
        </section>
      </Drawer>
      <SnackBar
        severity={error ? "error" : "success"}
        open={snackBar}
        handleClose={closeSnackBar}
        message={message}
      />
    </React.Fragment>
  );
}
