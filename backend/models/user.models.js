const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: false,
  },
  subscriptionStatus: {
    type: Boolean,
    required: false,
  },
  subscriptionId: {
    type: String,
    required: false,
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;