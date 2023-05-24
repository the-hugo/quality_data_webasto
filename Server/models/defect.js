import mongoose from "mongoose";

const defectSchema = mongoose.Schema(
    {
        error_num: Number,
        serial_num: String,
        description: String,
        action_type: String,
        category: String,
        spot: Array,
        component_level: Number,
        component_name: String,
        station_name: String,
        product_type: String
    }
)
 const Defect = mongoose.model("Defect", defectSchema);
 export default Defect;