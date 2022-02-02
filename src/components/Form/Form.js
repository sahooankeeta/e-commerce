import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Select from "@mui/material/Select";
import { addProduct, updateProduct } from "./../../actions";

import useStyles from "./styles";
const Form = () => {
  const classes = useStyles();
  const id = new URLSearchParams(useLocation().search).get("id");
  //console.log(useParams());
  const item = useSelector((state) =>
    id ? state.products.find((p) => p.id === id) : null
  );

  const dispatch = useDispatch();
  const [product, setProduct] = React.useState({
    company: "",
    title: "",
    description: "",
    price: 0,
    category: "",
    gender: "",
    rating: 0,
    images: [],
    specifications: {},
  });
  const [fields, setField] = React.useState([{ key: "", value: "" }]);
  const [avatars, setAvatar] = React.useState([{ link: "" }]);
  const pages = ["men", "women", "boys", "girls"];
  const pageItems = [
    ["t-shirts", "shirts", "jackets", "trousers"],
    [
      "dress",
      "jumpsuits",
      "kurtis,tunics,tops",
      "trousers and capris",
      "sweaters and sweatshirts",
    ],
    ["t-shirts", "trousers"],
    ["dress", "tops"],
  ];

  React.useEffect(() => {
    if (item) {
      const f = [];
      setProduct({
        ...product,
        id: item.id,
        company: item.company,
        title: item.title,
        description: item.description,
        price: item.price,
        gender: item.gender,
        rating: item.rating,
        category: item.category,
      });
      Object.entries(item.specifications).forEach(([k, v]) =>
        f.push({ key: k, value: v })
      );
      setField(f);
    }
    if (item) {
      const p = [];
      item.images.forEach((i) => p.push({ link: i }));
      setAvatar(p);
    }
  }, []);
  const handleChange = (type, i, e) => {
    const list = type === "image" ? [...avatars] : [...fields];
    list[i][e.target.name] = e.target.value;
    if (type === "image") setAvatar(list);
    else setField(list);
  };
  const addField = (type) => {
    const list =
      type === "image"
        ? [...avatars, { link: "" }]
        : [...fields, { key: "", value: "" }];
    if (type === "image") setAvatar(list);
    else setField(list);
  };
  const deleteField = (type, index) => {
    const list = type === "image" ? [...avatars] : [...fields];
    list.splice(index, 1);
    if (type === "image") setAvatar(list);
    else setField(list);
  };
  const clear = () => {
    setProduct({
      company: "",
      title: "",
      description: "",
      price: "",
      category: "",
      gender: "",
      rating: "",
      images: [],
      specifications: {},
    });
    setField([{ key: "", value: "" }]);
    setAvatar([{ link: "" }]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sub");
    avatars.map((a) =>
      setProduct({ ...product, images: product.images.push(a.link) })
    );

    fields.map((s) => (product.specifications[s.key] = s.value));
    console.log(product);
    if (item) dispatch(updateProduct(product));
    else dispatch(addProduct(product));
    clear();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item lg={12} sm={12} md={8}>
        <Paper elevation={3}>
          <form
            className={classes.form}
            // style={{ padding: "15px", "&>*": { marginBottom: "2px" } }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography variant="h3" component="h2" gutterBottom>
              {item ? "update" : "create"} product
            </Typography>
            <TextField
              required
              name="company"
              variant="outlined"
              label="Company"
              halfWidth
              value={product.company}
              onChange={(e) =>
                setProduct({ ...product, company: e.target.value })
              }
            ></TextField>
            <TextField
              required
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            ></TextField>
            <TextField
              required
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></TextField>
            <TextField
              style={{ marginRight: "10px" }}
              required
              type="number"
              name="price"
              variant="outlined"
              label="Price"
              halfWidth
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            ></TextField>
            <TextField
              style={{ marginRight: "10px" }}
              type="number"
              required
              halfWidth
              name="rating"
              variant="outlined"
              label="Rating"
              value={product.rating}
              onChange={(e) =>
                setProduct({ ...product, rating: e.target.value })
              }
            ></TextField>
            <FormControl sx={{ m: 1, minWidth: 150 }} style={{ margin: "0" }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.gender}
                label="Gender"
                onChange={(e) =>
                  setProduct({ ...product, gender: e.target.value })
                }
              >
                <MenuItem value="men">men</MenuItem>
                <MenuItem value="women">women</MenuItem>
                <MenuItem value="boys">boys</MenuItem>
                <MenuItem value="girls">girls</MenuItem>
              </Select>
            </FormControl>
            {product.gender && (
              <FormControl style={{ margin: "0" }} sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={product.category}
                  label="Category"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                >
                  {pages.indexOf(product.gender) !== -1
                    ? pageItems[pages.indexOf(product.gender)].map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))
                    : ""}
                </Select>
              </FormControl>
            )}

            <Typography component="h3">images</Typography>

            <Grid container spacing={2}>
              {avatars.map((image, index) => (
                <Grid item sm={12} md={12} lg={12} key={index}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <TextField
                      required
                      name="link"
                      variant="outlined"
                      label="link"
                      value={image.link}
                      style={{ flexGrow: "1" }}
                      onChange={(e) => handleChange("image", index, e)}
                    ></TextField>

                    <Button onClick={() => deleteField("image", index)}>
                      remove
                    </Button>

                    <Button onClick={() => addField("image")}>add</Button>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Typography component="h3">specifications</Typography>
            <Grid container spacing={2}>
              {fields.map((s, index) => (
                <Grid item key={index}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      required
                      name="key"
                      style={{ flexGrow: "1" }}
                      variant="outlined"
                      label="key"
                      value={s.key}
                      onChange={(e) => handleChange("specification", index, e)}
                    ></TextField>
                    <span
                      style={{
                        margin: "0 5px",
                        fontWeight: "600",
                        fontSize: "30px",
                      }}
                    >
                      :
                    </span>
                    <TextField
                      style={{ flexGrow: "1" }}
                      name="value"
                      variant="outlined"
                      label="Value"
                      value={s.value}
                      onChange={(e) => handleChange("specification", index, e)}
                    ></TextField>
                    <RemoveCircleIcon
                      onClick={() => deleteField("specification", index)}
                    />

                    <AddCircleIcon onClick={() => addField("specification")} />
                  </div>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.buttonSubmit}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Form;
