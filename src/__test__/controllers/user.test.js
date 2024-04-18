const {
  signup,
  login,
  getAllUsers,
  getUserById,
  verifyUserEmail,
} = require("../../controller/userController");
const userModel = require("../../models/userModel");
const { req, res } = require("../__mock__/users.mock");
const {
  registrationSuccessful,
  sendEmailVerificationToken,
} = require("../../utils/sendgrid");
const bcrypt = require("bcrypt");
// Moock Dependencies
jest.mock("../../models/userModel");
jest.mock("../../utils/sendgrid");
jest.mock("bcrypt");
const loginReq = {
  body: {
    loginId: "user@gmail.com",
    password: "Test_password",
  },
};

describe("Sign Up", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should send a status code of 400 when user phone or email exists", async () => {
    userModel.findOne.mockReturnValue(res.body);

    await signup(req, res);

    //  assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: ["Email already taken", "Phone Number already taken"],
      status: "error",
    });
  });

  it("should send a status code of 200 when new user is created", async () => {
    userModel.findOne.mockResolvedValue(undefined);

    userModel.create.mockResolvedValue(req.body);
    registrationSuccessful.mockResolvedValue(null);

    await signup(req, res);

    // assertions
    expect(userModel.findOne).toHaveBeenCalledTimes(2);
    expect(userModel.create).toHaveBeenCalledWith(req.body);
    expect(registrationSuccessful).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });
  it("Should return a status code 400 if login is invalid", async () => {
    userModel.findByCredentials.mockResolvedValue(undefined);
    await login(loginReq, res);

    //  assertions
    expect(userModel.findByCredentials).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  // it('should return a status code 400 and a message "Incorrect Password" when the password is invalid', async () => {
  //   userModel.findByCredentials.mockResolvedValue(res.body);
  //    userModel.findOne.mockResolvedValue(res.body);
  //   bcrypt.compare.mockResolvedValue(false);
  //   await userModel.findByCredentials(loginReq.body.loginId, loginReq.body.password);

  //   //  assertions
  //   expect(userModel.findByCredentials).toHaveBeenCalledTimes(1);
  //   expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  //   expect(res.status).toHaveBeenCalledWith(400);
  // });

  it("should return a status code 200 when the loginId(phone or email) and  password is correct", async () => {
    userModel.findByCredentials.mockResolvedValue(res.body);
    // bcrypt.compare.mockImplementation(() => Promise.resolve(true));
    await login(loginReq, res);

    //  assertions
    expect(userModel.findByCredentials).toHaveBeenCalledTimes(1);
    // expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Get All Users", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return a status code 200 and list of users", async () => {
    userModel.find.mockResolvedValue([res.body]);

    await getAllUsers(req, res);

    // Assertions
    expect(userModel.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "success",
      data: { user: [res.body] },
    });
  });

  it("should return a status code 200 and an empty array if they are no users", async () => {
    userModel.find.mockResolvedValue(undefined);

    await getAllUsers(req, res);

    // Assertions
    expect(userModel.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Users Not Found!",
      status: "error",
    });
  });

  it("should return status code 400 if user are not found", async () => {
    userModel.findOne.mockResolvedValue(undefined);

    await getUserById(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Parameter. Resource Not Found",
      status: "error",
    });
  });
});

describe("Get Users By ID", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return status code 200 if user with id exists", async () => {
    userModel.findOne.mockResolvedValue(res.body);

    await getUserById(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "success",
      data: { user: res.body },
    });
  });

  it("should return status code 404 if user with id does not exists", async () => {
    userModel.findOne.mockResolvedValue(undefined);

    await getUserById(req, res);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Parameter. Resource Not Found",
      status: "error",
    });
  });
});

describe("Verify User Email", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a status code 400 if otp is invalid", async () => {
    userModel.findOne.mockResolvedValue(null);
    req.body = {
      otp: "000000",
    };
    await verifyUserEmail(req, res);

    // assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ otp: req.body.otp });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid Otp",
      status: "error",
    });
  });

  it("should return a status code 200 if otp is valid", async () => {
    userModel.findOne.mockResolvedValue(res.body);
    req.body = {
      otp: "000000",
    };
    await verifyUserEmail(req, res);

    // assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ otp: req.body.otp });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "user Email has been verified",
      data: { user: res.body },
    });
  });
});

describe("Send Otp", () => {
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });
  // it("should return a status code 404 when the email provided is not found ", async () => {
  //   req.body = {
  //     email: "user@gmail.com",
  //   };
  //   userModel.findOne.mockResolvedValue(null);
  //   await sendEmailVerificationToken(req.body.email);
  //   expect(userModel.findOne).toHaveBeenCalledTimes(1);
  //   expect(res.status).toHaveBeenCalledWith(200)
  // });
});
