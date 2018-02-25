import * as request from "supertest";
import * as app from "../src/app";

describe("GET /block", () => {
  it("should return 200 OK", () => {
    return request(app).get("/block")
      .expect(200);
  });
});
