--  select
--       t.trans_buy_id,
--       t.symbol,
--       t.shares,
--       t.trade_date,
--       t.purchase_price,
--       t.shares * t.purchase_price as book_value,
--       t.shares * cp.current_price as market_value,
--       (t.shares * cp.current_price) - (t.shares * t.purchase_price) as gain_loss,
--       b.broker_name || ' ' || b.broker_acc_number as broker,
--       t.comment,
--       p.port_id
--     from
--       transaction_buy t
--         inner join currentprice cp
--           on t.symbol = cp.symbol
--         left join broker b
--           on t.broker_id = b.broker_id
--         left join portfolio p
--           on t.port_id = p.port_id
--     where
--       t.symbol = 'BABA'
--       and p.port_id = 83
--     order by
--       t.symbol,
--       t.trade_date


select current_price from currentprice where symbol='AMZN'
