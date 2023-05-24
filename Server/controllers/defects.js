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

    try {
        await newDefect.save();
        res.status(201).json(newDefect);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
