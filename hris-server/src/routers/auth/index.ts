import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import db, { Timestamp } from "../../db";
import { converter } from "../../db/converter";
import { User } from "../../models/user";
import { Profile } from "../../models/profile";

const auth = express.Router();
const secretKey = process.env.JWT_SECRET;

// Auth - Register
auth.post('/register', async (req, res) => {
  const { name, email, password, role, position, department } = req.body;
  try {
    // Validate parameters
    if (!name || !email || !password || !role || !position || !department) {
      return res.status(400).send({ error: "Missing required parameters" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user and profile to database
    const userRef = db.collection('users').withConverter(converter<User>()).doc();
    const profileRef = db.collection('profile').withConverter(converter<Profile>()).doc();

    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const profileData = {
      user_id: userRef.id,
      position,
      department,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const batch = db.batch();
    batch.set(userRef, userData);
    batch.set(profileRef, profileData);

    await batch.commit();

    res.status(201).send({ message: "User registered successfully", userId: userRef.id });
  } catch (error) {
    console.error("Register error: ", error);
    res.status(500).send(error);
  }
});

// Auth - Login
auth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate parameters
    if (!email || !password) {
      return res.status(400).send({ error: "Missing parameter required" });
    }

    // Find the user by email
    const userQuery = await db.collection('users').withConverter(converter<User>()).where('email', '==', email).get();
    if (userQuery.empty) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const userId = userQuery.docs[0].id;

    // Ensure userData is not undefined
    if (!userData) {
      return res.status(500).json({ error: 'Failed to retrieve user data' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Update last login time
    await userDoc.ref.update({ updated_at: Timestamp.now() });

    // Generate JWT token
    if (!secretKey) {
      return;
    }
    const token = jwt.sign({ userId: userId, role: userData.role }, secretKey, { expiresIn: '1h' });

    res.status(200).send({
      userId: userId,
      message: `${email} with name ${userData.name} has signed in successfully`,
      token: token
    });
  } catch (error: any) {
    console.error("Sign-in error: ", error.message);
    res.status(500).json({ error: "Sign-in failed" });
  }
});

export { auth };
