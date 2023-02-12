// const loginController = require("../controllers/auth/loginController");
// const registerController = require("../controllers/auth/registerController");
// const user = require("../controllers/auth/userController");

// const mockRequest = (body = {}, params = {}, query = {}, user = {}) => {
//   return {
//     body: body,
//     params: params,
//     query: query,
//     user: user,
//   };
// };

// const mockResponse = () => {
//   const res = {};

//   res.json = jest.fn().mockReturnValue(res);
//   res.status = jest.fn().mockReturnValue(res);

//   return res;
// };

// // describe("loginController login function", () => {
// //   it(`res.json called with{status:200, message: "success login"}, data:{name:name, password:password}}`, async () => {
// //     const req = mockRequest(
// //       {
// //         name: "ari",
// //         password: "Us3r!",
// //       },
// //       {},
// //       {}
// //     );
// //     const res = mockResponse();
// //     await loginController.login(req, res);

// //     expect(res.status).toBeCalledWith(200);
// //     expect(res.json).toBeCalledWith({
// //       status: 200,
// //       message: "success login",
// //     });
// //   });
// // });

// // REGISTER;
// // describe("product controller with create function", () => {
// //   it(`res.json called with {status: 200, message: "success add product"},
// //      data:{product_name: product_name, qty: qty, price: price, image: image}`, async () => {
// //     const req = mockRequest(
// //       {
// //         name: "defghi",
// //         email: "a@gmail",
// //         password: "Us3r!",
// //         rePassword: "Us3r!",
// //       },
// //       {},
// //       {},
// //       {}
// //     );
// //     const res = mockResponse();

// //     await registerController.registerAutoEmail(req, res);
// //     expect(res.status).toBeCalledWith(200);
// //     expect(res.json).toBeCalledWith({
// //       status: 200,
// //       message: "success add product",
// //     });
// //   });
// // });

// // USER
// // GET ALL
// describe("product controller with get all product function", () => {
//   it(`res.json called with {status:200, message: "success get product"}, data:{status: status, message: message}`, async () => {
//     const req = {};
//     const res = mockResponse();

//     await user.getAllUser(req, res);
//     expect(res.status).toBeCalledWith(200);
//     expect(res.json).toBeCalledWith({
//       status: 200,
//       message: "success get all user",
//     });
//   });
// });
