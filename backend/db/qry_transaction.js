module.exports = {
  sql_transactions: `
    select
      t.trans_buy_id,
      t.symbol,
      t.shares,
      t.trade_date,
      t.purchase_price,
      t.shares * t.purchase_price as book_value,
      t.shares * cp.current_price as market_value,
      (t.shares * cp.current_price) - (t.shares * t.purchase_price) as gain_loss,
      b.broker_name || ' ' || b.broker_acc_number as broker,
      t.comment,
      p.port_id
    from
      transaction_buy t
        inner join currentprice cp
          on t.symbol = cp.symbol
        left join broker b
          on t.broker_id = b.broker_id
        left join portfolio p
          on t.port_id = p.port_id
    where
      t.symbol = $1
      and p.port_id = $2
    order by
      t.symbol,
      t.trade_date`,
  sql_transaction: `
      select
        t.trans_buy_id,
        t.symbol,
        t.shares,
        t.trade_date,
        t.purchase_price,
        t.shares * t.purchase_price as book_value,
        t.shares * cp.current_price as market_value,
        (t.shares * cp.current_price) - (t.shares * t.purchase_price) as gain_loss,
        b.broker_name || ' ' || b.broker_acc_number as broker,
        t.comment,
        p.port_id
      from
        transaction_buy t
          inner join currentprice cp
            on t.symbol = cp.symbol
          left join broker b
            on t.broker_id = b.broker_id
          left join portfolio p
            on t.port_id = p.port_id
      where
        t.symbol = cp.symbol
        and t.broker_id = b.broker_id
        and t.trans_buy_id = $1
      order by
        t.symbol,
        t.trade_date`,
  sql_update_transaction: `update
      transaction_buy
    set
      symbol=$2,
      trade_date=$3,
      purchase_price=$4,
      shares=$5,
      broker_id=$6,
      comment=$7
    where
      trans_buy_id=$1
    returning *
      `,
  sql_post_transaction: `
      insert into transaction_buy
      (symbol, shares, trade_date, purchase_price, port_id, broker_id, comment)
      values($1, $2, $3, $4, $5, $6, $7)
      `,
};
