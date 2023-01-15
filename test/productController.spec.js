const productController = require("../controllers/productController");

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

// ADD
// describe("product controller with create function", () => {
//   it(`res.json called with {status: 200, message: "success add product"},
//    data:{product_name: product_name, qty: qty, price: price, image: image}`, async () => {
//     const req = mockRequest(
//       {
//         product_name: "def ghi",
//         qty: 10,
//         price: 3000,
//         image: "google.com",
//       },
//       {},
//       {},
//       { id: 1 }
//     );
//     const res = mockResponse();

//     await productController.addProduct(req, res);
//     expect(res.status).toBeCalledWith(200);
//     expect(res.json).toBeCalledWith({
//       status: 200,
//       message: "success add product",
//     });
//   });
// });

//GET ALL
describe("product controller with get all product function", () => {
  it(`res.json called with {status:200, message: "success get product"}, data:{status: status, message: message}`, async () => {
    const req = {};
    const res = mockResponse();

    await productController.getProduct(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success get product",
    });
  });
});

//GET BY ID
describe("product controller with get by id function", () => {
  it(`res.json called with {status: 200, message: "sucess get data"}, data:{status:status, message: message}`, async () => {
    const req = mockRequest({}, { id: 1 }, {}, {});
    const res = mockResponse();

    await productController.getById(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success get data",
    });
  });
});

//GET BY NAME
describe("product controller with get by name function", () => {
  it(`res.json called with {status: 200, message: 'succes get data}, data:{status: status, message: message}`, async () => {
    const req = mockRequest({}, {}, { search: "abc" }, {});
    const res = mockResponse();

    await productController.getByName(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success get data",
    });
  });
});

//UPDATE
describe("product controller with update function", () => {
  it(`res.json called with {status: 200, message:}, data:{status:status, message: message}`, async () => {
    const req = mockRequest(
      {
        product_name: "jkl ghi",
        qty: 10,
        price: 4000,
        image: "google.com",
      },
      { id: 1 },
      {},
      {}
    );
    const res = mockResponse();

    await productController.updateProduct(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success update product",
    });
  });
});
