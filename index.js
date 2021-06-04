const express = require("express");
const app = express();
const cors = require("cors");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const port = process.env.PORT || 5000;
const userRouter = require("./router/user");
const employeeRouter = require("./router/employee");
const schema = require("./schema/schema");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);
app.use(employeeRouter);

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
