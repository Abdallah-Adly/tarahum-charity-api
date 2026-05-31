import { app } from "./app";
import { dbConnect } from "./config/db.config";
import { environments } from "./config/environment";


const PORT = environments.PORT;

async function runApplication() {
  await dbConnect();

  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
  });
}

runApplication();
