import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import hbs from "hbs";
import { forecast } from "./utils/forecast.js";
import { geocode } from "./utils/geocode.js";

const app = express();

// Define paths for configuration.
const execDirPath = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(execDirPath, "..", "public");
const viewsPath = path.join(execDirPath, "..", "templates", "views");
const partialsPath = path.join(execDirPath, "..", "templates", "partials");

// Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve.
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Hakan Güçlü"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Hakan Güçlü"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Hakan Güçlü",
    helpText: "This is some helpful text."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided." });
  }

  geocode(req.query.address, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude, location } = geoData;

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      res.send({ forecast, location, address: req.query.address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hakan Güçlü",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hakan Güçlü",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
