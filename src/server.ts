import app from "./App";
import Route from "@cores/Route";

// Port
const port = process.env.PORT || 4000;

// Route
app.use("/", new Route().init());

// Listen
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
