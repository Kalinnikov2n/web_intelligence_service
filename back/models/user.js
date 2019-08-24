const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/game', { useNewUrlParser: true });
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
     login:   String,           // название колоды
     password: String         // для какой должности
    }
  );
  userSchema.methods.createHash = function(password){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  userSchema.methods.checkHash = function(password){
      return bcrypt.compareSync(password, this.password);
  }

  const User = mongoose.model('users', userSchema);
  module.exports = User;