const userAdapter = require("../../src/domain/adapter/user.adapter");

describe("Post Endpoints", () => {
  it("should return all users", async () => {
    const res = await userAdapter.GetAllUsers();
    expect(res).not.toBeNull();
  });
  it("should return a single user", async () => {
    const res = await userAdapter.GetUserByID(
      "bf4e9f39-23e3-4aed-98ba-f9fae75c8d35"
    );
    expect(res).not.toBeNull();
  });
});
