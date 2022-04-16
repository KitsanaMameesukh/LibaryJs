const book = require('./book');
const user = require('./user')

module.exports = {
  Query :{
    ...book.Query,
    ...user.Query
  },
  Mutation:{
    ...book.Mutation,
    ...user.Mutation
  }
}