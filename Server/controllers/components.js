import Component from "../models/component.js";

export const getComps = async (req, res) => {
    try {
        const comps = await Component.find();
        // console.log(comps, "Yeah")
        res.status(200).json(comps)
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}