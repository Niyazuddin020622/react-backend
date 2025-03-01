import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  occupation: String,
  income: Number,
  maritalStatus: String,
  adoptionReason: String,
  idProof: String,
  incomeProof: String,
  medicalReport: String,
  agreeTerms: Boolean,
});

const Adoption = mongoose.model("Adoption", adoptionSchema);
export default Adoption;
