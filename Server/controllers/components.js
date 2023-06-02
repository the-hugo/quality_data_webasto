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

export const createComp = async (req, res) => {
    const { component_num, serial_num, image, level, subComponents } = req.body;
  
    try {
      const newComp = await Component.create({
        component_num,
        serial_num,
        image,
        level,
        subComponents,
      });
  
      res.status(201).json(newComp);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  

export const deleteComp = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'Invalid component id' });
  
    try {
      const deletedComp = await Component.findByIdAndRemove(id);
  
      if (!deletedComp)
        return res.status(404).json({ message: 'Component not found' });
  
      res.status(200).json({ message: 'Component deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };

  export const editComp = async (req, res) => {
    const { id } = req.params;
    const { component_num, serial_num, image, level, subComponents } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'Invalid component id' });
  
    try {
      const updatedComp = await Component.findByIdAndUpdate(
        id,
        { component_num, serial_num, image, level, subComponents },
        { new: true }
      );
  
      if (!updatedComp)
        return res.status(404).json({ message: 'Component not found' });
  
      res.status(200).json(updatedComp);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  