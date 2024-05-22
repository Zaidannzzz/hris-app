import bodyParser from "body-parser";
import express from "express";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import db from "../../db";

const auth = express.Router();
const secretKey = process.env.JWT_SECRET;

//Auth
auth.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Validate parameters
    if (!name || !email || !password || !role) {
      return res.status(400).send({ error: "Missing parameter required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    const userRecord = db.collection('users').doc();
    await userRecord.set({
      name,
      email,
      password: hashedPassword,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (!userRecord) {
      return res.status(400).send({ error: "Invalid user" });
    }

    res.status(201).send({
      message: "Success!",
      user: userRecord.id,
    });
  } catch (error) {
    console.error("Register error: ", error);
    res.status(500).send(error);
  }
})

auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate parameters
    if (!email || !password) {
      return res.status(400).send({ error: "Missing parameter required" });
    }

    // Find the user
    const userRef = db.collection('users').where('email', '==', email);
    const userSnapshot = await userRef.get();
    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // update to database
    await userDoc.ref.update({ updated_at: new Date() });

    // Validate JWT key
    if (!secretKey) {
      return;
    }
    const token = jwt.sign({ userId: userData.id, role: userData.role }, secretKey, { expiresIn: '1h' });

    res.status(200).send({
      message: `${email} with name ${userData.name} has sign In Successfully`,
      token: token
    });
  } catch (error: any) {
    console.error("Sign-in error: ", error.message);
    res.status(500).json({ error: "Sign-in failed" });
  }
});

export { auth };