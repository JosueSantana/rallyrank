//TODO: Cover testing at a later time
import mongoose from "mongoose";
import request from "supertest";
import app from "./app.js";


describe("Testing the root path of the express app", () => {
  test("It should respond with a 200 HTTP Code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async() => {
  await mongoose.disconnect();
})