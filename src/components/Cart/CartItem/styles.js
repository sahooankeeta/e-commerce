import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  cartItem: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
    margin: "0 auto",
    marginBottom: "10px",
  },
  leftBlock: {
    marginRight: "20px",
    height: "180px",
    width: "130px",
  },
  rightBlock: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  cartImage: {
    height: "inherit",
    width: "inherit",
    borderRadius: 4,
    background: "#ccc",
  },
  cartItemActions: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontWeight: "500",
  },
}));
