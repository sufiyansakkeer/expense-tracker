import mongoose from "mongoose";

const e164Regex = /^\+\d{7,15}$/;

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        email: { type: String, required: true, unique: true },

        password: { type: String, required: true },

        phoneNumber: {
            countryCode: {
                type: String,
                required: true,
                match: [/^\+\d{1,3}$/, "Invalid country code"]
            },
            number: {
                type: String,
                required: true,
                match: [/^\d{7,12}$/, "Phone number must contain only digits"]
            }
        }

    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
