const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateJwt = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    "thisisasecrettoken"
  );
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Wrong username or password");
  }
  const matchingPassword = await bcrypt.compare(password, user.password);
  if (!matchingPassword) {
    throw new Error("Wrong username or password");
  }
  return user;
};

userSchema.methods.checkIfOwnsClassroom = async function (id) {
  if (!user.classrooms.some((item) => item._id === id)) {
    throw new Error();
  }
};

userSchema.methods.checkIfOwnsQuiz = async function (id) {
  //provjeriti da li moze ovako
  if (!user.classrooms.quizes.some((item) => item._id === id)) {
    throw new Error();
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
