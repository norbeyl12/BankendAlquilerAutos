module.exports = {
  mockRequest: () => {
      const req = {};
      req.body = jest.fn().mockReturnValue(req.body);
      req.params = jest.fn().mockReturnValue(req.params);
      return req;
  },

  mockResponse: () => {
      const res = {};
      res.send = jest.fn().mockReturnValue(res);
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
  },
};
