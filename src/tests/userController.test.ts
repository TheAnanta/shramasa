import request from "supertest";
import express from "express";
import userRoute from "../routes/userRoutes";
import prisma from "../prismaClient";

const app = express();
app.use(express.json());
app.use("/api", userRoute);

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/signup", () => {
  it("should create a new user and return it", async () => {
    const userData = {
      userId: "12345",
      name: "John Doe",
      email: "john@example.com",
      phone: "555-5555",
    };

    const response = await request(app).post("/api/signup").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("userId", userData.userId);
    expect(response.body).toHaveProperty("name", userData.name);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("phone", userData.phone);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app).post("/api/signup").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Enter all fields required.");
  });

  it("should return an error if the user already exists", async () => {
    const userData = {
      userId: "12345",
      name: "John Doe",
      email: "john@example.com",
      phone: "555-5555",
    };

    await request(app).post("/api/signup").send(userData);

    const response = await request(app).post("/api/signup").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "User already exists");
  });
});
