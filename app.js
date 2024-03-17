require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const gravatarRoute = require("./routes/gravatarRoute");

app.use(cors());
app.use(express.json());

app.use("/api", gravatarRoute);

app.listen(port, () => {
  console.log(`App the running at port:${port}`);
});
