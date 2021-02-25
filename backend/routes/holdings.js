const sql_holdings = require("../db/qry_portfolio").sql_holdings;
const sql_portfolios = require("../db/qry_portfolio").sql_portfolios;
const sql_create_portfolio = require("../db/qry_portfolio")
  .sql_create_portfolio;

const router = require("express").Router();

const db = require("../db");

// /api/holdings/portId
router.get("/:id", async (req, res) => {
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

// deleteHoldingAPI - delete a holdings
router.delete("/:portId/:symbol/", async (req, res) => {
  console.log("holdingss: delete holding: req.params.id", req.params);
  const symbol = req.params.symbol;
  const port_id = req.params.portId;
  try {
    const qryResult = await db.query(
      "DELETE FROM transaction_buy WHERE symbol=$1 and port_id=$2",
      [symbol, port_id]
    );

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
