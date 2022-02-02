import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  form: {
    padding: "10px",
    "&>*": {
      marginBottom: "10px",
    },
    // display: "flex",
    // margin: "0 auto",
    // justifyContent: "center",
  },
  // fileInput: {
  //   width: "97%",
  //   margin: "10px 0",
  // },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
