const provider = (provided = 'object') => (req, res, next) => {
  const currentJSON = res.json.bind(res);
  res.json = (data) => { // eslint-disable-line
    const status = res.statusCode || 200;
    return currentJSON({
      meta: {
        resource: provided,
        status,
      },
      [provided]: typeof(data.toJSON) === 'function' ? data.toJSON() : data,
    });
  };

  next();
};

module.exports = provider;
