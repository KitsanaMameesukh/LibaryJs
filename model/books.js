
const {model,Schema} = require('mongoose')

const bookSchema  = new Schema({
  book_Name :String,
  book_Author:String,
  book_Type:String,
  book_Price:Number,
  book_YearOf:Date,
  book_InStore:Date,
  book_Available:Number,
  book_Rental:Number
})
module.exports = model('Books',bookSchema);