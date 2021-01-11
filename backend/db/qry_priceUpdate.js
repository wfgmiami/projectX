module.exports = {
  sql_price_update: `update
    currentprice as cp
    set
    current_price = s.current_price,
    current_price_date = s.current_price_date
    from (
       $1
    ) as s (symbol, current_price, current_price_date)
    where cp.symbol = s.symbol
    returning *
    `,
};
