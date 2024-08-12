import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";

const app: Application = express();
const port = 3000;
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too Many Requests From This IP  ",
});


// parse requests
app.use(express.json());
// http request logger middleware
app.use(morgan("common"));
// http request logger middleware
app.use(helmet());
// rate limiting middleware to all requests.
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});
app.post("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
