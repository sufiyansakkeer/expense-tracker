import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    description: {
        type: String,
        required: "",
    },
    date: {
        type: Date,
        required: true,
    },

}, {
    timestamps: true,
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

