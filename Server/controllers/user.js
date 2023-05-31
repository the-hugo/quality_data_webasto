import User from "../models/user.js";

export const createUser = async (req, res) => {
    const { personal_id, name } = req.body;

    try {
        const newUser = new User({ personal_id, name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const editUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { personal_id } = req.body;

    try {
        const user = await User.findOne({ personal_id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
