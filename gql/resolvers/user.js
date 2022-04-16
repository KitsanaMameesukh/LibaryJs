const Users = require("./../../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
require("dotenv").config();
const {
  validateRegisterInput,
  validateLogin,
} = require("./../../middleware/validator");
function genToken(user) {
  return jwt.sign(
    {
      id:user.id,
      email:user.email,
      username:user.username,
      role:user.role
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await Users.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLogin(username, password);
      const user = await Users.findOne({ username });
      if(!valid){
        throw new UserInputError("Errors", { errors });
        
      }
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = genToken(user);
      return {
        ...user._doc,
        id:user._id,
        role:user.role,
        token
      }
    },
    async register(
      _,
      { registerInput: { username, password, confirmpassword,fullname, email, role } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmpassword,
        fullname,
        email,
        role
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await Users.findOne({ username });
      if (user) {
        throw new UserInputError("Username Is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 10);
      const newUser = new Users({
        username,
        password,
        fullname,
        email,
        role,
      });
      const res = await newUser.save();

      const token = genToken(res);
      return {
        ...res._doc,
        id: res._id,
        role:user.role,
        token,
      };
    },
  },
};
