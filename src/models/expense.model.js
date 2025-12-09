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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;   // add new field "id"
            delete ret._id;     // remove _id
            delete ret.__v;     // remove version key
        }
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

