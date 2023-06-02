import Defect from "../models/defect.js";

export const getDefects = async (req, res) => {
    try {
        const defects = await Defect.find();
        // console.log(defects, "What")
        res.status(200).json(defects)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const createDefect = async (req, res) => {
    const defect = req.body;
    const newDefect = new Defect(defect);
    console.log(defect)
    try {
        await newDefect.save();
        res.status(201).json(newDefect);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const editDefect = async (req, res) => {
    const { id } = req.params;
    const updatedDefect = req.body;

    try {
        const defect = await Defect.findByIdAndUpdate(id, updatedDefect, {
            new: true
        });
        if (!defect) {
            return res.status(404).json({ message: "Defect not found" });
        }
        res.status(200).json(defect);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDefect = async (req, res) => {
    const { id } = req.params;

    try {
        const defect = await Defect.findByIdAndDelete(id);
        if (!defect) {
            return res.status(404).json({ message: "Defect not found" });
        }
        res.status(200).json({ message: "Defect deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};