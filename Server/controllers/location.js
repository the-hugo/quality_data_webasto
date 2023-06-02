import Location from "../models/location.js";

export const createLocation = async (req, res) => {
  const { error_num, x, y } = req.body;

  try {
    const newLocation = new Location({ error_num, coordinates: { x, y } });
    await newLocation.save();

    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    await Location.findByIdAndRemove(id);

    res.json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editLocation = async (req, res) => {
  const { id } = req.params;
  const { error_num, x, y } = req.body;

  try {
    const location = await Location.findById(id);

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    if (error_num) {
      location.error_num = error_num;
    }

    if (x) {
      location.coordinates.x = x;
    }

    if (y) {
      location.coordinates.y = y;
    }

    await location.save();

    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
