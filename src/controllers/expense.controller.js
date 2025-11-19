import Expense from "../models/expense.model.js";

// ------------------------------ CREATE ------------------------------
export const createExpense = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { title, amount, category, type, description, date } = req.body;

        // Basic validations
        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Type validations
        if (typeof title !== "string" || typeof amount !== "number" || typeof category !== "string" || typeof type !== "string") {
            return res.status(400).json({ message: "Invalid data type" });
        }

        // Allowed type
        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Type must be either 'income' or 'expense'" });
        }

        // Valid date
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid date format" });
        }

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
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ------------------------------ GET ALL ------------------------------
export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user._id
        }).select("-__v -user").sort({ date: -1 });

        return res.status(200).json({ message: "Success", data: expenses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ------------------------------ GET BY ID ------------------------------
export const getExpenseById = async (req, res) => {
    try {
        // Validate ID
        if (!req.params.id || req.params.id.length !== 24) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }

        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id,
        }).select("-__v -user");

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        return res.status(200).json({ message: "Success", data: expense });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ------------------------------ UPDATE ------------------------------
export const updateExpense = async (req, res) => {
    try {
        // Validate ID
        if (!req.params.id || req.params.id.length !== 24) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }

        const { title, amount, category, type, description, date } = req.body;

        // Field validations
        if (!title || !amount || !category || !type || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Type validations
        if (typeof title !== "string" || typeof amount !== "number" || typeof category !== "string" || typeof type !== "string") {
            return res.status(400).json({ message: "Invalid data type" });
        }

        // Allowed type
        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "Type must be either 'income' or 'expense'" });
        }

        // Valid date
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({ message: "Invalid date format" });
        }

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
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


// ------------------------------ DELETE ------------------------------
export const deleteExpense = async (req, res) => {
    try {
        // Validate ID
        if (!req.params.id || req.params.id.length !== 24) {
            return res.status(400).json({ message: "Invalid expense ID" });
        }

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
