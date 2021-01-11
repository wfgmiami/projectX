/* eslint-disable react/display-name */
export const COLUMNS = [
  {
    Header: "Portfolio Name",
    accessor: (d) => d.port_name,
  },
  {
    Header: "Symbols",
    accessor: "symbols",
  },
  {
    Header: "Market Value",
    accessor: (d) => Number(Number(d.mv).toFixed(2)).toLocaleString("en"),
  },
  {
    Header: "Day Change",
    accessor: "",
  },
  {
    Header: "Day Change %",
    accessor: "",
  },
  {
    Header: "Total Change",
    accessor: (d) => Number(Number(d.ugl).toFixed(2)).toLocaleString("en"),
  },
  {
    Header: "Total Change %",
    accessor: "",
  },
];
