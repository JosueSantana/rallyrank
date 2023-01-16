//TODO: Finalize app.ts test file
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "./app";
import User from "./models/User";

// Database connection
let mongoMemServer: MongoMemoryServer;
let mongoConnection: typeof mongoose | undefined;

beforeAll(async () => {
  mongoMemServer = await MongoMemoryServer.create();
  mongoConnection = await mongoose.connect(mongoMemServer.getUri());
  await User.create({
    email: "jane.smith@gmail.com",
    password: "my-secure-password-1234",
    profileInfo: { firstName: "Jane", lastName: "Smith" },
    settingsInfo: { mode: "Dark" },
  });
});

afterAll(async () => {
  if (mongoConnection) {
    await mongoConnection.connection.close();
  }
  if (mongoMemServer) {
    await mongoMemServer.stop();
  }
});

describe("Testing the root path of the express app", () => {
  it("should respond with a 200 HTTP Code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should successfully connect to database", async () => {
    const user = await User.findOne({
      email: "jane.smith@gmail.com",
    });

    expect(user?.profileInfo.firstName).toEqual("Jane");
    expect(user?.profileInfo.lastName).toEqual("Smith");
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});
