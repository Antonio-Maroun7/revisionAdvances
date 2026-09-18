const express = require("express");
const cors = require("cors");

const UserRoutes = require("./routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API Running...",
  });
});

app.use((req, res) => {
  res.status("404").json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
