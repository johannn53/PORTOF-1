const loginController = require("../controllers/auth/loginController");
const registerController = require("../controllers/auth/registerController");

const mockRequest = (body = {}, params = {}, query = {}, user = {}) => {
  return {
    body: body,
    params: params,
    query: query,
    user: user,
  };
};

const mockResponse = () => {
  const res = {};

  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);

  return res;
};

describe("loginController login function", () => {
  it(`res.json called with{status:200, message: "success login"}, data:{name:name, password:password}}`, async () => {
    const req = mockRequest(
      {
        name: "arila",
        password: "Us3r!",
      },
      {},
      {}
    );
    const res = mockResponse();

    await loginController.login(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success login",
    });
  });
});

//REGISTER
// describe("registerController with register function", () => {
//   it(`res.json called with {status: 200, message: 'success register"}`, async () => {
//     const req = mockRequest(
//       {
//         name: "aril",
//         email: "a@gmail.com",
//         password: "12345",
//         rePassword: "12345",
//       },
//       {},
//       {},
//       { roles: "user" }
//     );
//     const res = mockResponse();

//     const testRegist = await registerController.register(req, res);
//     expect(res.status).toBeCalledWith(200);
//     expect(res.json).toBeCalledWith({
//       status: 200,
//       message: "success register",
//     });
//   });
// });
