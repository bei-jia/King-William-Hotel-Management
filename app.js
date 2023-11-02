const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./process.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    partialsDir: "views/partials",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/route"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
