const router = require("express").Router();
const jwt = require("jwt-simple");

module.exports = router;

router.use((req, res, next) => {
  res.locals = {
    jwtSecret: process.env.SECRET || "Anti-Aging Program Data-BET",
  };
  next();
});

router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  User.findByPassword({ email, password })
    .then((user) => {
      if (!user) return res.sendStatus(401);

      res.send({
        token: jwt.encode({ id: user.id }, res.locals.jwtSecret),
      });
    })
    .catch(next);
});

router.get("/:token", (req, res, next) => {
  try {
    const token = jwt.decode(req.params.token, res.locals.jwtSecret);
    User.scope("address", "user-role")
      .findById(token.id || token.token)
      .then((user) => {
        if (!user) return res.sendStatus(401);
        res.send(user);
      });
  } catch (err) {
    next(err);
  }
});
