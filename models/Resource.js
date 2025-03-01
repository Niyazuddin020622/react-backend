import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  buttonText: String,
});

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
