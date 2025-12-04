import Expense from "../models/expense.model.js";

// ------------------------------ CREATE ------------------------------
export const createExpense = async (req, res, next) => {
    try {

        await Expense.create({
            user: req.user._id,
            title,
            amount,
            category,
            type,
            description: description || "",
            date,
        });

        return res.status(201).json({ message: "Expense created successfully" });
    } catch (error) {
        next(error);
    }
};


// ------------------------------ GET ALL ------------------------------
export const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({
            user: req.user._id
        }).select("-__v -user").sort({ date: -1 });

        return res.status(200).json({ message: "Success", data: expenses });
    } catch (error) {
        next(error);
    }
};


// ------------------------------ GET BY ID ------------------------------
export const getExpenseById = async (req, res, next) => {
    try {

        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id,
        }).select("-__v -user");

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Success", data: expense });
    } catch (error) {
        next(error);
    }
};


// ------------------------------ UPDATE ------------------------------
export const updateExpense = async (req, res, next) => {
    try {
        const { title, amount, category, type, description, date } = req.body;

        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                title,
                amount,
                category,
                type,
                description: description || "",
                date,
            },
            { new: true } // new we used here to send the new updated data. instead of the old data.
        );

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Expense updated successfully", });

    } catch (error) {
        next(error);
    }
};


// ------------------------------ DELETE ------------------------------
export const deleteExpense = async (req, res, next) => {
    try {

        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        next(error);
    }
};
