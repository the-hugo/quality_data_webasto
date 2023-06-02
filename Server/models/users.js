import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        personal_id: {
            type: String,
            unique: true,
            required: true,
            minlength: 4,
            maxlength: 4,
            validate: {
                validator: function (value) {
                    // Ensure personal_id consists of 4 digits only
                    return /^\d{4}$/.test(value);
                },
                message: "personal_id must be a 4-digit value",
            },
        },
        first_name: String,
        last_name: String,
        station: String,
    }
);

const User = mongoose.model("User", userSchema);
export default User;