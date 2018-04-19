# GraphQL with Meteor, Apollo and React
Rafal Lozinski 0.1 2018-04-13


## Summary

A sample application showing integration of Apollo GraphQL services with Meteor and React.

* a client-side application with React as view layer and Apollo Client as the GraphQL services provider
* a server-side GraphQL API with data stored in MongoDB collections
* a MongoDB database (gets created automatically with Meteor project)
* GraphQL data services integrated with the Meteor accounts


## A note about Meteor

https://www.meteor.com/

* Meteor is a full-stack Javascript framework for building client-server web applications.
* To install Meteor on Windows (and avoid using Chocolatey), please use this link: https://install.meteor.com/windows
* Meteor comes bundled with a MongoDB database server. The MongoDB server gets created automatically with a Meteor project installation.


## Installation instructions

1. Install Meteor. (Links above.)
2. Clone this repo.
3. Run "meteor". (The required Meteor and Node packages get downloaded automatically.)


## Code Guidelines

1. Meteor packages
./meteor                                    <-- Meteor specific directory
/.meteor/packages                           <-- Meteor packages
apollo                                      <-- Meteor-Apollo integration package

2. Server-side
/imports/api/                               <-- server-side API: MongoDB collections, GraphQL definitions, GraphQL resolvers
/imports/startup/server/register-api.js     <-- server-side startup script: GraphQL type definitions, resolvers, server start

3. Client-side
/index.html                                 <-- application root HTML file
/imports/startup/client/index.js            <-- client-side main script: Apollo client startup, React app startup
/imports/ui/react/                          <-- application UI components
/imports/ui/react/App/App.js                <-- main application component: a composite GraphQL query, Apollo component wrapper


## A GraphQL React component anatomy - What to focus on

* the GraphQL query defines the data required by the view
  eg.:
  const customersQuery = gql`
  query Customers {
    customers {
      _id
      name
      active
      addresses {
        _id
        city
        postcode
      }
    }
    user {
      _id
    }
  }
  `;

* the GraphQL wrapper around the exported component (query results get injected as props)
  eg.:
  export default graphql(customersQuery, {
    props: ({ data }) => ({ ...data })
  })(withApollo(App));


## Todos - Some excercises

Some of the proposed exercises to extend the application: GraphQL, logic, and integration

* user registration / login, customer, addres form validation with errors displayed
* a form and logic for editing customers' data
* removing customers
* a form and logic for editing customers' addresses
* removing addresses
