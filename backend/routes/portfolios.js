const sql_holdings = require("../db/qry_portfolio").sql_holdings;
const sql_portfolios = require("../db/qry_portfolio").sql_portfolios;
const sql_create_portfolio = require("../db/qry_portfolio")
  .sql_create_portfolio;

const router = require("express").Router();

const db = require("../db");

// /api/portfolios
router.get("/", async (req, res, next) => {
  try {
    const portfolios = await db.query(`${sql_portfolios}`);
    // console.log("backend/routes/portfolios: get: portfolio: ", portfolios);

    res.status(200).json({
      status: "success",
      results: portfolios.rows.length,
      data: {
        portfolios: portfolios.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  // console.log("backend/routes/portfolio: req.params: ", req.params);
  try {
    const portfolio = await db.query(
      "SELECT * FROM PORTFOLIO WHERE port_id=$1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: portfolio.rows.length,
      data: {
        portfolio: portfolio.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/holdings", async (req, res) => {
  try {
    const portfolio = await db.query(`${sql_holdings}`, [req.params.id]);
    res.status(200).json({
      status: "success",
      results: portfolio.rows.length,
      holdings: portfolio.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const port_name = req.body.port_name;
  // console.log("post req.body: ", req.body);

  try {
    if (port_name === "") throw Error("Portfolio name is required!");
    const qryResult = await db.query(
      "SELECT port_name FROM portfolio WHERE port_name = $1",
      [port_name]
    );
    // console.log("post: qryResult: ", qryResult, "port_name: ", port_name);
    if (qryResult.rows.length !== 0) {
      const error = "Portfolio name already exists!";
      res.status(400).send(error);
    } else {
      try {
        const newPortfolio = await db.query(`${sql_create_portfolio}`, [
          port_name,
        ]);
        // console.log("post: newPortfolio: ", newPortfolio);
        res.status(201).json({
          status: "success",
          portfolio: newPortfolio.rows[0],
        });
      } catch (err) {
        res.status(400).send("Request could not process.");
      }
    }
  } catch (err) {
    res.status(400).send("Request could not process.");
  }
});

router.put("/:id", async (req, res) => {
  const port_id = req.params.id;
  const port_name = req.body.port_name;

  // console.log("put: port_id: ", port_id, " port_name: ", port_name);

  try {
    if (port_name === "") throw Error("Portfolio name is required!");
    const qryResult = await db.query(
      "SELECT port_name FROM portfolio WHERE port_name = $1",
      [port_name]
    );

    // console.log("put: qryResult: ", qryResult);

    if (qryResult.rows.length !== 0) {
      const error = "Portfolio name already exists!";
      res.status(400).send(error);
    } else {
      try {
        const updatedPortfolio = await db.query(
          "UPDATE portfolio SET port_name = $1 where port_id = $2 returning *",
          [port_name, port_id]
        );
        res.status(200).json({
          status: "success",
          portfolio: updatedPortfolio.rows[0],
        });
      } catch (err) {
        res.status(400).send("Request could not process.");
      }
    }
  } catch (err) {
    res.status(400).send("Request could not process.");
  }
});

router.delete("/:id", async (req, res) => {
  const port_id = req.params.id;
  // console.log("backend/routes/portfolios: port_id: ", port_id);

  try {
    const deletedPortfolio = await db.query(
      "delete from portfolio where port_id = $1",
      [port_id]
    );

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
