const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  id: {
    type: Number
  },
  user_id: {
    type: String,
    trim: true,
    required: "Enter a user ID"
  },
  category_id: {
    type: String
  },
  month_created: {
    type: Number
  },
  year_created: {
    type: Number
  },
  amount: {
    type: Number,
    required: "Enter an amount"
  },
  due_date: {
    type: Date,
    default: Date.now
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;