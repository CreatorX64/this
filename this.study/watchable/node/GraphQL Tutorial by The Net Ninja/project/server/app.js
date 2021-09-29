import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import { schema } from "./schema/schema.js";

const app = express();

// Allow cross-origin requests
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Listening for requests on port 4000");
});
