import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import { schema } from "./schema/schema.js";

const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.once("open", function () {
  console.log("Connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, function () {
  console.log("Listening for requests on port 4000");
});
