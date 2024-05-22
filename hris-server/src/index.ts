import dotenv from "dotenv";
import { app } from "./app";
dotenv.config();

const port = process.env.PORT || 3001;

const http = require("http").createServer(app);

http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});