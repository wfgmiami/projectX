module.exports = {
  sql_portfolios: `
    select
      p.port_id,
      p.port_name,
      p.currency,
      t.symbols,
      t.mv,
      (t.mv - t.bv) as ugl
    from portfolio as p
    left join (
      select
        t.port_id,
        count(distinct t.symbol) as symbols,
        sum(t.shares * cp.current_price) as mv,
        sum(t.shares) * sum(t.purchase_price * t.shares)/sum(t.shares) as bv
      from
        transaction_buy t,
        currentprice cp
      where
        cp.symbol = t.symbol
      group by
        t.port_id
      ) as t
    on p.port_id = t.port_id
    `,
  sql_holdings: `
    select
      t.symbol,
      cp.current_price,
      sum(t.shares) as shares,
      sum(t.purchase_price * t.shares)/sum(t.shares) as avg_cost_per_share,
      sum(t.shares) * cp.current_price as market_value,
      sum(t.shares) * sum(t.purchase_price * t.shares)/sum(t.shares) as book_value,
      p.port_id
    from
      transaction_buy t,
      currentprice cp,
      portfolio p
    where
      t.symbol = cp.symbol
      and p.port_id = t.port_id
      and p.port_id = $1
    group by
      t.symbol, cp.current_price,p.port_id
    order by
      t.symbol`,
  sql_holding: `select
      t.symbol,
      cp.current_price,
      sum(t.shares) as shares,
      sum(t.purchase_price * t.shares)/sum(t.shares) as avg_cost_per_share,
      sum(t.shares) * cp.current_price as market_value,
      sum(t.shares) * sum(t.purchase_price * t.shares)/sum(t.shares) as book_value,
      p.port_id
    from
      transaction_buy t,
      currentprice cp,
      portfolio p
    where
      t.symbol = cp.symbol
      and p.port_id = t.port_id
      and p.port_id = $1
      and t.symbol = $2
    group by
      t.symbol, cp.current_price,p.port_id`,
  sql_create_portfolio: `
    insert into portfolio(port_name) values($1) returning *
  `,
};
