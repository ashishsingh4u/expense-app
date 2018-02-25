import * as request from "supertest";
import * as app from "../src/app";

describe("GET /login", () => {
  it("should return 200 OK", () => {
    return request(app).get("/login")
      .expect(200);
  });
});

describe("GET /signup", () => {
  it("should return 200 OK", () => {
    return request(app).get("/signup")
      .expect(200);
  });
});

describe("POST /login", () => {
  it("should return some defined error message with valid parameters", (done) => {
    return request(app).post("/login")
      .field("email", "singh.ashish@zoho.com")
      .field("password", "pass@123")
      .expect(302)
      .end(function(err, res) {
        expect(res.error);
        done();
      });
  });
});
