-- get the portfolio name and number of stocks in it
select sub.portfolio_name, count(sub.*) as symbol from (select p.portfolio_name, t.symbol from portfolio p, transaction t, portfolio_transaction pt where p.portfolio_id=pt.portfolio_id and t.transaction_id=pt.transaction_id group by p.portfolio_name, t.symbol order by symbol) as sub group by sub.portfolio_name;

-- get the total market value in a portfolio
select sum(mktval.mv) from (SELECT s.symbol, (s.current_price * sub.shares) as mv from (select sum(t.shares) as shares, t.symbol from transaction t GROUP BY t.symbol) as sub, summary s where s.symbol=sub.symbol) as mktval;
select sum(mktval.mv) from (SELECT cp.symbol, (cp.current_price * t.shares) as mv from (select sum(t.shares) as shares, t.symbol from transaction t GROUP BY t.symbol) as t, currentprice cp where cp.symbol=t.symbol) as mktval;


-- get the portfolio name and number of stocks in it, the total market value in a portfolio
select sub.portfolio_name, count(sub.*) as symbol, (select sum(mktval.mv) from (SELECT cp.symbol, (cp.current_price * t.shares) as mv from (select sum(t.shares) as shares, t.symbol from transaction t GROUP BY t.symbol) as t, currentprice cp where cp.symbol=t.symbol) as mktval) as mv from (select p.portfolio_name, t.symbol from portfolio p, transaction t, portfolio_transaction pt where p.portfolio_id=pt.portfolio_id and t.transaction_id=pt.transaction_id group by p.portfolio_name, t.symbol order by symbol) as sub group by sub.portfolio_name;


-- get the average cost for a stock
select sum(t.purchase_price*t.shares)/sum(t.shares) avgcost from transaction t where t.symbol='AAL';



-- CURRENTLY USED
-- get the portfolio id, portfolio name and number of stocks in it, the total market value in a portfolio
select sub.portfolio_id, sub.portfolio_name, count(sub.*) as symbol, (select sum(mktval.mv) from (SELECT cp.symbol, (cp.current_price * t.shares) as mv from (select sum(t.shares) as shares, t.symbol from transaction t GROUP BY t.symbol) as t, currentprice cp where cp.symbol=t.symbol) as mktval) as mv from (select p.portfolio_name, p.portfolio_id, t.symbol from portfolio p, transaction t, portfolio_transaction pt where p.portfolio_id=pt.portfolio_id and t.transaction_id=pt.transaction_id group by p.portfolio_name, p.portfolio_id, t.symbol order by symbol) as sub group by sub.portfolio_name, sub.portfolio_id;


-- holdings with symbol, current price, shares, bv, mv for a given portfolio /api/1/holdings
with ac as (
select symbol, sum(t.purchase_price*t.shares)/sum(t.shares) avgcost from transaction t
group by symbol order by symbol)
select
  sub.symbol,
  sub.shares,
  cp.current_price,
  ac.avgcost,
  sub.shares * cp.current_price as mv,
  sub.shares * ac.avgcost as bv

from
  currentprice cp,
  ac,
(select
  t.symbol,
  sum(t.shares) as shares
from
  transaction t,
  portfolio_transaction pt,
  portfolio p, currentprice cp
  where
  p.portfolio_id = pt.portfolio_id
  and pt.transaction_id = t.transaction_id
  and pt.portfolio_id = 1
  and cp.symbol = t.symbol
group by t.symbol
order by t.symbol) as sub
where sub.symbol = cp.symbol;

