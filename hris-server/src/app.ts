import express from "express";
import { auth } from "./routers/auth/index";
import bodyParser from 'body-parser';

const app = express();
app.use(express.json())

app.use(auth)

export { app };