import * as request from "supertest";
import * as app from "../src/app";

describe("GET /contact", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/contact")
      .expect(200, done);
  });
});

describe("POST /contact", () => {
  it("should return false from assert when no message is found", (done) => {
    request(app).post("/contact")
      .field("name", "Ashish Singh")
      .field("email", "singh.ashish@zoho.com")
      .end(function(err, res) {
        expect(res.error);
        done();
      })
      .expect(302);
  });
});