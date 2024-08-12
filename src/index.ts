import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import errorMiddleware from "./middlewares/error.middleware";
import config from "./config";
import db from "./database/index";

const app: Application = express();
const port = config.port || 3000;
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too Many Requests From This IP",
});

// parse requests
app.use(express.json());
// http request logger middleware
app.use(morgan("common"));
// http request logger middleware
app.use(helmet());
// rate limiting middleware to all requests.
app.use(limiter);

// app.use("/api", routes);

// add routing for / path
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World 🌍",
  });
});

// error handler middleware
app.use(errorMiddleware);

app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home 😂",
  });
});

// test conection to database

// db.connect().then((client) => {
//   return client
//     .query("SELECT NOW()")
//     .then((res) => {
//       client.release();
//       console.log(res.rows);
//     })
//     .catch((err) => {
//       client.release();
//       console.log(err.stack);
//     });
// });





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
