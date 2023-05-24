import mongoose from "mongoose";

const componentSchema = mongoose.Schema(
    {
        component: String,
        level: Number,
        subComponents: Array
    }
)

const Component = mongoose.model("Component", componentSchema);
export default Component;