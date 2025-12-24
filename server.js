const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/comment", require("./routes/commentRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
