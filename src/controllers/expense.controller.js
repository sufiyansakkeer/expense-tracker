import Expense from "../models/expense.model.js";

export const createExpense = async (req, res) => {

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            console.log(req.body);
            return res.status(400).json({ message: "All fields are required" })
        }
        console.log("User from the token", req.user);

        const { title, amount, category, type, description, date } = req.body;
        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (typeof title !== "string" || typeof amount !== "number" || typeof category !== "string" || typeof type !== "string") {
            return res.status(400).json({ message: "Invalid data type" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Type must be either 'income' or 'expense" });
        }
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid date format" });
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

        return res.status(201).json({ message: "Expense created successfully", });
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
