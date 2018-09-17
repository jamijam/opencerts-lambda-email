const path = require("path");
const fs = require("fs");
const messageTemplate = require("./messageTemplate");
const certificate = require("../../test/fixtures/certificate.json");

const expectedPathHtml = path.join(__dirname, "./expected.html");
const expectedContentHtml = fs.readFileSync(expectedPathHtml).toString();

const expectedPathTxt = path.join(__dirname, "./expected.txt");
const expectedContentTxt = fs.readFileSync(expectedPathTxt).toString();

const expectedPathSubject = path.join(__dirname, "./expected.subject");
const expectedContentSubject = fs.readFileSync(expectedPathSubject).toString();

describe("messageTemplate", () => {
  it("returns html and text given a certificate", () => {
    const message = messageTemplate(certificate);
    expect(message.html).to.eql(expectedContentHtml);
    expect(message.text).to.eql(expectedContentTxt);
    expect(message.subject).to.eql(expectedContentSubject);
  });

  it("throws for undefined certificate", () => {
    expect(() => messageTemplate()).to.throw;
    expect(() => messageTemplate(undefined)).to.throw;
  });

  it("throws for null certificate", () => {
    expect(() => messageTemplate(null)).to.throw;
  });

  it("throws for invalid certificate", () => {
    expect(() => messageTemplate({ data: "Invalid Data" })).to.throw;
  });
});
