const Checkit = require('checkit');

module.exports = rules => (req, res, next) => {
  const validation = rules instanceof Checkit ? rules : new Checkit(rules);
  const params = Object.assign(
    {}, req.body, req.params, req.query
  );

  validation.run(params)
    .then(() => {
      req.params = params; // eslint-disable-line
      next();
    })
    .catch(e => {
      res.status(400)
        .send({
          validations: e.toJSON(),
        });
    });
};
