import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    massege: "Hello World!",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
