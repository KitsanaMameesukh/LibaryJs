const Books = require("../../model/books");
const auth = require("../../middleware/auth");
module.exports = {
  Query: {
    async getBooks() {
      try {
        const books = await Books.find();
        return books;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addBooks(
      _,
      {
        book: {
          book_Name,
          book_Author,
          book_Type,
          book_Price,
          book_YearOf,
          book_InStore,
          book_Available,
          book_Rental,
        },
      },
      context,
      info
    ) {
      // book_YearOf = book_YearOf.split('T');
      // book_InStore = book_InStore.split('T');
      const user = auth(context);
      if (user.role !== "guest") {
        const newBook = new Books({
          book_Name,
          book_Author,
          book_Type,
          book_Price,
          book_YearOf,
          book_InStore,
          book_Available,
          book_Rental,
        });
        const res = await newBook.save();
        return {
          ...res._doc,
          id: res._id,
          user,
        };
      } else {
        throw new Error("Please Login");
      }
    },
  },
};
