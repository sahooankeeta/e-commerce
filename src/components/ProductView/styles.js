import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  carousel: {
    width: "60%",
    margin: "0 auto",
  },
  card: {
    height: "500px",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: "260px",
    objectPosition: "top",
  },
  cardContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  cardAction: {
    display: "flex",
    flexDirection: "column",
    flex: "80%",
  },
}));
