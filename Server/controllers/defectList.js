import DefectList from '../models/defectList.js';

export const getDefectList = async (req, res) => {
  try {
    const defectList = await DefectList.find();
    res.status(200).json(defectList);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const createDefectList = async (req, res) => {
  const { error, work_center, error_code, product_id, group, defect_type, quality_issues, need_location } = req.body;

  try {
    const newDefect = await DefectList.create({
      error,
      work_center,
      error_code,
      product_id,
      group,
      defect_type,
      quality_issues,
      need_location,
    });

    res.status(201).json(newDefect);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const editDefectList = async (req, res) => {
  const { id } = req.params;
  const { error, work_center, error_code, product_id, group, defect_type, quality_issues, need_location } = req.body;

  try {
    const updatedDefect = await DefectList.findByIdAndUpdate(
      id,
      {
        error,
        work_center,
        error_code,
        product_id,
        group,
        defect_type,
        quality_issues,
        need_location,
      },
      { new: true }
    );

    if (!updatedDefect) {
      return res.status(404).json({ message: 'DefectList not found' });
    }

    res.status(200).json(updatedDefect);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const deleteDefectList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDefect = await DefectList.findByIdAndRemove(id);

    if (!deletedDefect) {
      return res.status(404).json({ message: 'DefectList not found' });
    }

    res.status(200).json({ message: 'DefectList deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
