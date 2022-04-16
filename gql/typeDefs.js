const { gql } = require("apollo-server");

module.exports = gql`
  type Books {
    book_Name: String!
    book_Author: String!
    book_Type: String!
    book_Price: Int!
    book_YearOf: String!
    book_InStore: String!
    book_Available: Int!
    book_Rental: Int!
  }
  input bookInput {
    book_Name: String!
    book_Author: String!
    book_Type: String!
    book_Price: Int!
    book_YearOf: String!
    book_InStore: String!
    book_Available: Int!
    book_Rental: Int!
  }

  type Users {
    username: String!
    password: String!
    confirmpassword: String
    fullname:String!
    email: String!
    role: String!
    token:String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmpassword: String
    fullname:String
    email: String!
    role: String!
  }
  type Query {
    getBooks: [Books]
  }
  type Query {
    getUsers:[Users]
  }
  type Mutation {
    addBooks(book: bookInput): Books!
    register(registerInput:RegisterInput):Users!
    login(username:String!,password:String!):Users!

  }

`;
