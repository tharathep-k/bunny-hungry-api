require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const authroute = require("./routes/auth-route")
const productroute = require("./routes/product-route")

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: {message: "Too many request"}

}))

app.use(helmet())
app.use(express.json());

app.use("/auth", authroute)
app.use("/menu", productroute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
