import Resource from '../models/Resource.js';
import mongoose from 'mongoose';

// ✅ Get Resource By ID
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Resource ID" });
    }

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    console.log("Found Resource:", resource);
    res.json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: 'Error fetching resource' });
  }
};

// ✅ Get All Resources
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resources' });
  }
};

// ✅ Create New Resource
export const createResource = async (req, res) => {
  try {
    const { title, description, link, buttonText } = req.body;
    const newResource = new Resource({ title, description, link, buttonText });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Error creating resource' });
  }
};


// ✅ Update Existing Resource
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, buttonText } = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { title, description, link, buttonText },
      { new: true, runValidators: true } // 🔹 Update के बाद नई वैल्यू return होगी
    );

    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(updatedResource);
  } catch (error) {
    console.error("Error updating resource:", error);
    res.status(500).json({ error: 'Error updating resource' });
  }
};