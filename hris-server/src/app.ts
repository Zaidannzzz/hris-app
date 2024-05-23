import express from "express";
import { auth } from "./routers/auth/index";
import bodyParser from 'body-parser';
import cors from 'cors';
import profile from "./routers/user";

const app = express();
app.use(express.json())
app.use(cors());

app.use(auth)
app.use(profile)

export { app };