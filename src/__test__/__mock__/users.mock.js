// mock response object
class MockResponse {
  constructor() {
    this.statusCode = 200; // Default status code
    this.headers = {}; // Default headers
    this.body = {
      _id: "a2febnuk3b42feb",
      firstName: "jhon",
      lastName: "doe",
      email: "user@gmail.com",
      phoneNumber: "0807655341",
      gender: "MALE",
      password: "password",
      country: "Nigeria",
      verified: true,
      role: "USER",
      save: jest.fn(x => x) 
    }; // Default body
    this.status = jest.fn(this.status.bind(this)); // Mock function for status method
    this.json = jest.fn(this.json.bind(this)); // Mock function for json method
    this.send = jest.fn(this.json.bind(this));
  }

  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  write(data) {
    this.body += data;
    return this;
  }

  end(data) {
    if (data) {
      this.write(data);
    }
    return this;
  }

  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  json(data) {
    this.setHeader("Content-Type", "application/json");
    // this.write(JSON.stringify(data)); // Write JSON data to body
    return this; // Allow chaining
  }

  send(data) {
    this.setHeader("Content-Type", "application/json");
    // this.write(data); // Write JSON data to body
    return this; // Allow chaining
  }
}

const res = new MockResponse();

//  mock request object
const req = {
  body: {
    firstName: "jhon",
    lastName: "doe",
    email: "user@gmail.com",
    phoneNumber: "0807655341",
    gender: "MALE",
    password: "password",
    country: "Nigeria",
    verified: true,
    role: "USER",
  },
  params: {
    userId: "a2febnuk3b42feb",
  },
};
module.exports = {
  req,
  res,
};
