import Expense from "../models/expense.model.js";

export const createExpense = async (req, res) => {

    try {
        const { title, amount, category, type, description, date } = req.body;
        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const expense = await Expense.create({
            user: req.user._id,
            title,
            amount,
            category,
            type,
            description: description || "",
            date,
        })

        return res.status(201).json({ message: "Expense created successfully", expense });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });

    }
};

export const getAllExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({
            user: req.user._id
        }).sort({ date: -1 });

        return res.status(200).json({ message: "Success", expenses });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });

    }

};
export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Success", expense });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const { title, amount, category, type, description, date } = req.body;
        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const expense = await Expense.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id,
        }, {
            title,
            amount,
            category,
            type,
            description: description || "",
            date,
        }, {
            new: true,
        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Expense updated successfully", expense });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,

        });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Expense deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
