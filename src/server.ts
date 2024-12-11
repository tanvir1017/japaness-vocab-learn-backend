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
    server = app.listen(Number(env.PORT), "192.168.31.138", () => {
      console.log(`Server running on http://192.168.31.138:${env.PORT}`);
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
