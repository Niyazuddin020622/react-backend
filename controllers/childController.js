import Child from "../models/Child.js";

// ✅ Fetch all children with optional filters
export const getChildren = async (req, res) => {
    let { gender, ageGroup, location } = req.query;
    let query = {};

    if (gender) query.gender = gender;
    
    // Partial match for location using regex (case insensitive)
    if (location) query.location = { $regex: location, $options: "i" };

    if (ageGroup) {
        if (ageGroup === "infant") query.age = { $gte: 0, $lte: 2 };
        if (ageGroup === "toddler") query.age = { $gte: 2, $lte: 5 };
        if (ageGroup === "teen") query.age = { $gte: 6 };
    }

    try {
        const children = await Child.find(query);
        res.json(children);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch children" });
    }
};

// ✅ Fetch a single child by ID
export const getChildById = async (req, res) => {
    try {
        const child = await Child.findById(req.params.id);
        if (!child) return res.status(404).json({ message: "Child not found" });
        res.json(child);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Add a new child
export const addChild = async (req, res) => {
    const { name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations } = req.body;

    if (!name || !age || !gender || !location || !photo || !description || !background || !education || !aspirations) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    const child = new Child({ name, age, gender, location, photo, description, background, hobbies, personality, education, languages, aspirations });

    try {
        const newChild = await child.save();
        res.status(201).json(newChild);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update child details
export const updateChild = async (req, res) => {
    try {
        const updatedChild = await Child.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChild) return res.status(404).json({ message: "Child not found" });
        res.json(updatedChild);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete child
export const deleteChild = async (req, res) => {
    console.log("Received delete request for ID:", req.params.id); // Debugging ke liye
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    
    try {
      const deletedChild = await Child.findByIdAndDelete(req.params.id);
      if (!deletedChild) {
        return res.status(404).json({ message: "Child not found" });
      }
      res.json({ message: "Child deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete child" });
    }
};
