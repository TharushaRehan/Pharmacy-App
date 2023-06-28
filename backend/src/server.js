import express from "express";
import mongoose from "mongoose";
import admin from "firebase-admin";
import fs from "fs";
import { db, connectToDB } from "./db.js";
import { ObjectId } from "mongodb";
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

// update pharmacy details
app.put("/api/pharmacy/updatedetails", async (req, res) => {
  const { pName, address, pDistrict, type, contact, pharmacist } = req.body;
  const { uid } = req.user;
  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  if (pharmacy) {
    try {
      await db.collection("pharmacies").updateOne(
        { uid: uid },
        {
          $set: {
            pharmacyName: pName,
            pharmacyAddress: address,
            pharmacyDistrict: pDistrict,
            pharmacyType: type,
            contactNumber: contact,
            pharmacist: pharmacist,
          },
        }
      );
      res.send("Updated");
    } catch (err) {
      console.log(err);
    }
  }
});
// define medicine scheme
const medicineShema = new mongoose.Schema({
  uid: { type: String, required: true },
  medName: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  price: { type: Number, required: true },
  expireDate: { type: String, required: true },
  addedDate: { type: String, required: true },
});
const Medicine = mongoose.model("Medicine", medicineShema);

// get all the medicines in the pharmacy
app.get("/api/pharmacy/getmedicines", async (req, res) => {
  const { uid } = req.user;
  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  if (pharmacy) {
    const medicines = await db.collection("medicines").find({ uid }).toArray();
    res.send(medicines);
  } else {
    res.sendStatus(404);
  }
});

// add medicines to the database
app.post("/api/pharmacy/addmedicines", async (req, res) => {
  const { medName, quantity, supplier, price, expireDate, addedDate } =
    req.body;
  const { uid } = req.user;
  const newMedicine = new Medicine({
    uid,
    medName,
    quantity,
    supplier,
    price,
    expireDate,
    addedDate,
  });
  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  if (pharmacy) {
    try {
      await db.collection("medicines").insertOne(newMedicine);

      res.send("Medicine Added Successfully");
    } catch (err) {
      res.send(err);
    }
  } else {
    console.log("Nooo");
  }
});

// update medicine details
app.put("/api/pharmacy/updatemedicine/:id", async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;
  //console.log(id);
  const { quantity, price } = req.body;
  const quantity1 = Number(quantity);
  const price1 = Number(price);
  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  //console.log(pharmacy.medicines);
  if (pharmacy) {
    try {
      const filter = { _id: new ObjectId(id) };

      const update = {
        $inc: { quantity: quantity1 },
        $set: { price: price1 },
      };

      await db.collection("medicines").updateOne(filter, update);
      res.send("Successfully Updated");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

// delete medicine details
app.delete("/api/pharmacy/deletemedicine/:id", async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  const pharmacy = await db.collection("pharmacies").findOne({ uid });
  //console.log(pharmacy.medicines);
  if (pharmacy) {
    try {
      const filter = { _id: new ObjectId(id) };
      await db.collection("medicines").deleteOne(filter);
      res.send("Successfully Deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});
connectToDB(() => {
  console.log("Successfully connected to the database.");
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
