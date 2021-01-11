const router = require("express").Router();
const db = require("../db");
const sql_transactions = require("../db/qry_transaction").sql_transactions;
const sql_transaction = require("../db/qry_transaction").sql_transaction;
const sql_update_transaction = require("../db/qry_transaction")
  .sql_update_transaction;
const sql_post_transaction = require("../db/qry_transaction")
  .sql_post_transaction;
const sql_holding = require("../db/qry_portfolio").sql_holding;

// loadTransactions API: /api/transactions/1/AAPL
router.get("/:port_id/:symbol", async (req, res) => {
  console.log("get transactions: req.params: ", req.params);
  try {
    const qryResult = await db.query(`${sql_transactions}`, [
      req.params.symbol,
      req.params.port_id,
    ]);
    res.status(200).json({
      status: "success",
      results: qryResult.rows.length,
      transactions: qryResult.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// loadTransaction API: /api/id/171
router.get("/id/:id", async (req, res) => {
  const transId = req.params.id;
  console.log("get transaction: ", transId);
  try {
    const qryResult = await db.query(`${sql_transaction}`, [transId]);

    res.status(200).json({
      status: "success",
      transaction: qryResult.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// PUT updateTransaction API
// update already existing transactions and send back updated holding
router.put("/:id", async (req, res) => {
  console.log(
    "transactions: put: req.params.id: ",
    req.params.id,
    "req.body: ",
    req.body
  );

  const trans_id = req.params.id;
  const symbol = req.body.symbol;
  const trade_date = req.body.trade_date;
  const purchase_price = req.body.purchase_price;
  const shares = req.body.shares;
  const broker = req.body.broker;
  const comment = req.body.comment;
  const port_id = req.body.port_id;
  let brokerId = null;

  if (broker) {
    try {
      const qryResult = await db.query(
        "select broker_id from broker where broker_name || ' ' || broker_acc_number = $1",
        [broker]
      );

      brokerId = qryResult.rows[0].broker_id;
    } catch (error) {
      console.log(error);
    }
  }
  console.log("transactions: put: brokerId: ", brokerId);
  try {
    const qryResult = await db.query(`${sql_update_transaction}`, [
      trans_id,
      symbol,
      trade_date,
      purchase_price,
      shares,
      brokerId,
      comment,
    ]);
    const updatedHolding = await db.query(`${sql_holding}`, [port_id, symbol]);
    // console.log("transactions: put: updatedHolding: ", updatedHolding);
    res.status(200).json({
      status: "success",
      holding: updatedHolding.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// POST updateTransaction API
// post newly added transaction and send back updated holding
router.post("/", async (req, res) => {
  const symbol = req.body.symbol;
  const trade_date = req.body.trade_date;
  const purchase_price = req.body.purchase_price;
  const shares = req.body.shares;
  const broker = req.body.broker;
  const comment = req.body.comment;
  const port_id = req.body.port_id;
  let brokerId = null;
  console.log("transactions: post: req.body: ", req.body);
  if (broker) {
    try {
      const qryResult = await db.query(
        "select broker_id from broker where broker_name || ' ' || broker_acc_number = $1",
        [broker]
      );

      brokerId = qryResult.rows[0].broker_id;
    } catch (error) {
      console.log(error);
    }
  }
  console.log("transactions: post: brokerId: ", brokerId);

  try {
    const qryResult = await db.query(`${sql_post_transaction}`, [
      symbol,
      shares,
      trade_date,
      purchase_price,
      port_id,
      brokerId,
      comment,
    ]);

    const updatedHolding = await db.query(`${sql_holding}`, [port_id, symbol]);

    res.status(200).json({
      status: "success",
      holding: updatedHolding.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// deleteTransaction API - delete single or all transactions
router.delete("/:portId/:symbol/:transId", async (req, res) => {
  console.log("transactions: delete: req.params.id", req.params);
  const trans_id = req.params.transId;
  const symbol = req.params.symbol;
  const port_id = req.params.portId;

  if (trans_id === "undefined") {
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
  } else {
    try {
      const qryResult = await db.query(
        "DELETE FROM transaction_buy WHERE trans_buy_id=$1",
        [trans_id]
      );
      const updatedHolding = await db.query(`${sql_holding}`, [
        port_id,
        symbol,
      ]);

      res.status(200).json({
        status: "success",
        holding: updatedHolding.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
