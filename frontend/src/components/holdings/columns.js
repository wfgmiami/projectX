export const COLUMNS = [
  {
    Header: "Symbol",
    accessor: (d) => d.symbol,
  },
  {
    Header: "Price",
    accessor: (d) => d.current_price,
  },
  {
    Header: "Price Date",
    accessor: (d) => d.current_price_date,
  },
  {
    Header: "Shares",
    accessor: (d) => d.quantity,
  },

  {
    Header: "Trade Date",
    accessor: "trade_date",
  },
  {
    Header: "Purchase Price",
    accessor: (d) => d.purchase_price,
  },

  {
    Header: "Account",
    accessor: (d) => d.account,
  },
  // {
  //   Header: "Market Value",
  //   accessor: (d) => d.market_value,
  // },
  // {
  //   Header: "Total Gain/(Loss)",
  //   accessor: (d) => d.total_gain_loss,
  // },
];
