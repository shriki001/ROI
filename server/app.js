const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("./mongo");
const PORT = 8000;
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: "50mb",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api/companies", require("./routes/companies.route"));
app.use("/api/performance", require("./routes/performance.route"));
app.listen(PORT, (_) => console.log("info", `Server started on port ${PORT}`));
