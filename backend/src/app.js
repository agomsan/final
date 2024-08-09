const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./database/db");
const apiRoutes = require("./routes/index")
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;

//healthy
app.get("/api/healthy", (req, res) => {
  res.status(200).json({
    success: true,
    message: "My APP server is healthy",
  });
});

app.use("/api", apiRoutes);


sequelize
  .authenticate()
  .then(() => {
    console.log("Database authenticated");

    //star the server
    app.listen(PORT, () => {
      console.log(`server listening on port: ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Error authenticating database");
  });
