const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(express.static("public"));
app.use(express.json());

const commentRouter = require("./routers/commentRouter.js");
app.use("/api/comments", commentRouter);


app.get("/", (req, res) => {
    res.json("Root");
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta:${PORT}`);
});