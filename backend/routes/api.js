const router = require("express").Router();

router.use("/portfolios", require("./portfolios"));

router.use("/holdings", require("./holdings"));

router.use("/transactions", require("./transactions"));

router.use("/marketdata", require("./marketData"));

// router.use("/signin", require("./session"));

// router.use("/signup", require("./user"));

router.use(function (req, res) {
  res.status(404).end();
});

module.exports = router;
