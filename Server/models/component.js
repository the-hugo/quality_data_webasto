import mongoose from "mongoose";

const componentSchema = mongoose.Schema(
    {
        serial_num: String,
        image: String,
        component: String,
        level: Number,
        subComponents: Array,
    }
)

const Component = mongoose.model("Component", componentSchema);
export default Component;