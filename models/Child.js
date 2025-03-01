import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    background: { type: String, required: true },
    hobbies: { type: [String], default: [] },
    personality: { type: [String], default: [] },
    education: { type: String, required: true },
    languages: { type: [String], default: [] },
    aspirations: { type: String, required: true }
}, { timestamps: true });

const Child = mongoose.model("Child", childSchema);
export default Child;
