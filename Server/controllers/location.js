import Location from "../models/location.js";

export const createLocation = async (req, res) => {
  try {
    const { error_num, dropLocation, type } = req.body;
    const newLocation = new Location({ error_num, dropLocation, type });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLocation = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await Location.findByIdAndDelete(id);
    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { error_num, dropLocation } = req.body;
    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    if (error_num) {
      location.error_num = error_num;
    }

    if (dropLocation) {
      location.dropLocation = dropLocation;
    }

    await location.save();

    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

