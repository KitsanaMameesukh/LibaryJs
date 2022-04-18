module.exports.validateRegisterInput = (
  username,
  password,
  confirmpassword,
  fullname,
  email,
  role
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmpassword) {
    errors.confirmpassword = "Password must match";
  }
  if (fullname.trim().toLowerCase() === '') {
    errors.fullname = 'full name must not be empty'
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email ";
    }
  }
  if (role.trim() === "") {
    errors.role = "role must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
};
module.exports.validateLogin = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must be not empty'
  }
  if (password.trim() === '') {
    errors.password = 'Password must be not empty'

  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}
module.exports.validateBooks = (
  book_Name,
  book_Author,
  book_Type,
  book_Price,
  book_YearOf,
  book_InStore,
  book_Available,
  book_Rental
) => {
  const errors = {};
  if (book_Name.trim() === '') {
    errors.book_Name = 'Book Name must be not empty';
  }
  if (book_Author.trim() === '') {
    errors.book_Author = 'Book Author must be not empty';
  }
  if (book_Type.trim() === '') {
    errors.book_Type = 'Book Type must be not empty';
  }
  if (book_Price.trim() === '') {
    errors.book_Price = 'Book Price must be not empty';
  }
  if (book_YearOf.trim() === '') {
    errors.book_YearOf = 'Book YearOf must be not empty';
  }
  if (book_InStore.trim() === '') {
    errors.book_InStore = 'Book Instore must be not empty';
  }
  if (book_Available.trim() === '') {
    errors.book_Available = 'Book Availiable must be not empty';
  }
  if (book_Rental.trim() === '') {
    errors.book_Rental = 'Book Rental must be not empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}