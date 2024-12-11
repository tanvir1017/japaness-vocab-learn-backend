import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import env from "./app/config";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(env.DATABASE_URL as string);

    await seedSuperAdmin();

    // Listener
    server = app.listen(Number(env.PORT), () => {
      console.log(
        `Server running on http://localhost:${env.PORT}/api/v1/check`,
      );
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

main();

// TODO: Close server when process is terminated
process.on("unhandledRejection", () => {
  console.log("⚠️☠️ Server closed by unhandledRejection");
  console.log("🚀 ~ process.on ~ server:", server);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("⚠️☠️ Server closed by uncaught exception");
  process.exit(1);
});

// console.log(x);

// Promise.reject();
