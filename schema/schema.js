const graphql = require("graphql");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = graphql;

const EmployeeType = new GraphQLObjectType({
  name: "Employees",
  fields: {
    id: { type: graphql.GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    designation: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args, req) {
        return axios
          .get(`http://localhost:5000/employees/${args.id}`)
          .then((res) => res.data);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parentValue, args, req) {
        return axios
          .get("http://localhost:5000/employees")
          .then((res) => res.data);
      },
    },
  },
});
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, location, designation }) {
        return axios
          .post("http://localhost:5000/employees", {
            id,
            name,
            location,
            designation,
          })
          .then((res) => res.data);
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:5000/employees/${args.id}`)
          .then((res) => res.data);
      },
    },
    editEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        designation: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, location, designation }) {
        return axios
          .put("http://localhost:5000/employees", {
            id,
            name,
            location,
            designation,
          })
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
