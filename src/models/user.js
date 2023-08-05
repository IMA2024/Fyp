const mongoose = require("mongoose");
const bcrypt = require('bcrypt'); 

const userSchema = mongoose.Schema({
  photo:{
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  businesses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'business'
  },
  status: {
    type: String,
    default: 'Active'  
}
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password )
  }

module.exports = mongoose.model("user", userSchema);