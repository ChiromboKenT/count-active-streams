const request = require("supertest");
const app = require("../../src/server");

describe("Post Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/users/").send({
      streamID: "67891-f49f-49cc-pcert-78933577",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual("success");
    expect(res.body.errorCode).toBeNull();
    expect(res.body.message).toEqual("Created response successfull ");
  });
});

describe("Get Endpoints", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/v1/users/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.errorCode).toBeNull();
    expect(res.body.message).toEqual("GetAllUsers response successfull ");
  });
  it("should return user by Id", async () => {
    const res = await request(app).get(
      "/api/v1/users/bf4e9f39-23e3-4aed-98ba-f9fae75c8d35?maxStream=3"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.errorCode).toBeNull();
    expect(res.body.message).toEqual("GetUserByID response successfull ");
  });
  it("should return all users", async () => {
    const res = await request(app).get(
      "/api/v1/streams/bf4e9f39-23e3-4aed-98ba-f9fae75c8d35/45678-f49f-49cc-pgert-78933567?maxStream=4"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.errorCode).toBeNull();
    expect(res.body.message).toEqual("GetUserStreamByID response successfull ");
  });
});
