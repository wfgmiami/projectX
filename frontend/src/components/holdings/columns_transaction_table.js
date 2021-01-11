/* eslint-disable react/display-name */

export const COLUMNS = [
  {
    Header: "Symbol",
    accessor: "symbol",
  },
  {
    Header: "Trade Date",
    accessor: (d) => {
      const objectTradeDate = new Date(Date.parse(d.trade_date));
      const formattedTradeDate = objectTradeDate.toLocaleDateString();
      return formattedTradeDate;
    },
  },
  {
    Header: "Shares",
    accessor: (d) => d.shares,
  },
  {
    Header: "Purchase Price",
    accessor: (d) => d.purchase_price,
  },
  {
    Header: "Book Value",
    accessor: (d) => Number(d.book_value).toFixed(2),
  },
  {
    Header: "Market Value",
    accessor: (d) => Number(d.market_value).toFixed(2),
  },
  {
    Header: "Lot Gain / (Loss)",
    accessor: (d) => Number(d.gain_loss).toFixed(2),
  },
  {
    Header: "Broker Account",
    accessor: (d) => d.broker,
  },
  {
    Header: "Comment",
    accessor: (d) => d.comment,
  },
];
