import express from "express";
import multer from "multer";
import Adoption from "../models/adoptionModel.js";

const router = express.Router();

// Multer Storage for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST - Submit Adoption Form
router.post(
  "/adoptionform",
  upload.fields([
    { name: "idProof" },
    { name: "incomeProof" },
    { name: "medicalReport" },
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        address,
        occupation,
        income,
        maritalStatus,
        adoptionReason,
        agreeTerms,
      } = req.body;

      const newAdoption = new Adoption({
        fullName,
        email,
        phone,
        address,
        occupation,
        income,
        maritalStatus,
        adoptionReason,
        agreeTerms,
        idProof: req.files["idProof"] ? req.files["idProof"][0].path : null,
        incomeProof: req.files["incomeProof"] ? req.files["incomeProof"][0].path : null,
        medicalReport: req.files["medicalReport"] ? req.files["medicalReport"][0].path : null,
      });

      await newAdoption.save();
      res.status(201).json({ message: "Adoption form submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Server error while processing the adoption form" });
    }
  }
);

// GET - Fetch All Adoption Requests
router.get("/", async (req, res) => {
  try {
    const adoptions = await Adoption.find();
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch adoption requests" });
  }
});

export default router;
