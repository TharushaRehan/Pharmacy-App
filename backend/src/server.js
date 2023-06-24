import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import fs from "fs";
import { db, connectToDB } from "./db.js";
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});
const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
  if (req.user) {
    next();
  }
  //req.user = req.user || {};
});

// define pharmacy scheme
const pharmacySchema = new mongoose.Schema({
  uid: { type: String, required: true },
  pharmacyName: { type: String, required: true },
  pharmacyAddress: { type: String, required: true },
  pharmacyDistrict: { type: String, required: true },
  pharmacyType: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  pharmacist: { type: String, required: true },
  medicines: { type: Array, default: [] },
});
const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

app.post("/api/pharmacy/create", async (req, res) => {
  const {
    pharmacyName,
    pharmacyAddress,
    pharmacyDistrict,
    pharmacyType,
    contactNumber,
    pharmacist,
  } = req.body;
  const { uid } = req.user;

  const newPharmacy = new Pharmacy({
    uid,
    pharmacyName,
    pharmacyAddress,
    pharmacyDistrict,
    pharmacyType,
    contactNumber,
    pharmacist,
  });

  try {
    await db.collection("pharmacies").insertOne(newPharmacy);
    res.send("Successfull");
  } catch (error) {
    res.send({ error });
  }
});

app.get("/api/pharmacy/details", async (req, res) => {
  const { uid } = req.user;
  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  if (pharmacy) {
    res.json(pharmacy);
  } else {
    res.sendStatus(404);
  }
});

// define medicine scheme
//const medicineShema = new mongoose({});

app.put("/api/pharmacy/addmedicines", (req, res) => {});
app.get("/api/pharmacy/getallmedicines", (req, res) => {
  res.send("Hello");
});
connectToDB(() => {
  console.log("Successfully connected to the database.");
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
