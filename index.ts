import express from "express";
import routes from "./routes/prime";

const app = express();
app.use(express.json({ limit: "40mb" }));
const port = process.env.PORT || 3000;

app.use("/", routes);

// Not found
app.use((_, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
