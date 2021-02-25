/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-empty */
import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router";
import { useTable, useExpanded, useFlexLayout } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleRight,
  faAngleDown,
  faSync,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../common/Spinner";
import { loadPortfolioHoldings } from "../../redux/actions/holdingAction";
import {
  updateTransaction as updateTransactionApi,
  deleteTransaction as deleteTransactionApi,
} from "../../api/transactionApi";
import { deletePortfolioHolding as deletePortfolioHoldingApi } from "../../api/holdingApi";
import {
  getQuotes as getQuotesApi,
  updatePrices as updatePricesApi,
} from "../../api/marketDataApi";

import PropTypes from "prop-types";
import Modal from "../common/Modal";
import TransactionTable from "./TransactionTable";
import AddSymbol from "./AddSymbol";
import DeleteForm from "./DeleteForm";

function Table({
  columns: userColumns,
  data,
  renderRowSubComponent,
  expandedRows,
  prices,
  refreshSpinner,
}) {
  const loading = useSelector((state) => state.apiCallsInProgress);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded,
    useFlexLayout
  );

  return (
    <>
      {loading > 0 ? (
        <Spinner />
      ) : (
        <div {...getTableProps()} className="table">
          <div className="thead">
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* <tbody {...getTableBodyProps()}> */}
          <div className="tbody">
            {rows.map((row) => {
              prepareRow(row);
              let rowProps = row.getRowProps();

              const expandedRow = expandedRows.find((id) => id === row.id);

              // if there is expandedRow id that matches the current row id and
              // the current row .isExpanded===undefined - happens when all or just one price is updated

              if (
                expandedRow &&
                expandedRow === row.id &&
                row.isExpanded === undefined
              ) {
                console.log(
                  "expandedRows: ",
                  expandedRows,
                  "expandedRow:",
                  expandedRow,
                  " row.isExpanded: ",
                  row.isExpanded
                );
                row.toggleRowExpanded();
              }

              return (
                <React.Fragment key={rowProps.key}>
                  <div {...rowProps} className="tr">
                    {row.cells.map((cell) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div {...cell.getCellProps()} className="hold_td">
                          {cell.render("Cell", { refreshSpinner })}
                        </div>
                      );
                    })}
                  </div>
                  {/* shows the transactions when row.isExpanded=True OR the expandedRow id matches the current row id*/}
                  {/* {row.isExpanded || expandedRow ? ( */}
                  {row.isExpanded ? (
                    <div className="tr">
                      <div colSpan={visibleColumns.length} className="td">
                        {renderRowSubComponent({
                          row,
                          rowProps,
                          visibleColumns,
                          expanded,
                          prices,
                        })}
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  renderRowSubComponent: PropTypes.func.isRequired,
  refreshSpinner: PropTypes.string,
};
// prices are not tracked real time but are refreshed periodically (5-10min lag)
function HoldingTable(props) {
  const dispatch = useDispatch();
  const portfolioHoldings = useSelector((state) => state.holdings.holdingsList);
  const { match } = props;
  const portfolio_id = match.params.portfolio_id;
  const [marketPriceHoldings, setMarketPriceHoldings] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [prices, setPrices] = useState({});
  const [isAddSymbolOpen, toggleAddSymbol] = useState(false);
  const [isDeleteTransOpen, toggleDeleteTransaction] = useState(false);
  const [deletedHolding, setDeletedHolding] = useState({});
  const [refreshSpinner, setRefreshSpinner] = useState(null);

  console.log("expandedRows: ", expandedRows);

  // click to expand/collapse holding will put/remove the row into/from 'expandedRows' state
  // expandedRows is passed to the Holding Table
  const trackExpandedRows = (row) => {
    const rowId = row.id;
    if (!row.isExpanded) {
      setExpandedRows((prev) => [...prev, rowId]);
    } else {
      setExpandedRows((prev) => prev.filter((id) => id !== rowId));
    }
  };

  const columns = React.useMemo(
    () => [
      {
        id: "expander",
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleRight} />
            )}
          </span>
        ),

        // eslint-disable-next-line react/display-name
        Cell: (props) => {
          // console.log("refreshSpinner: ", refreshSpinner);
          const row = props.row;
          const updatingPrice = props.refreshSpinner === props.row.id;

          return (
            <>
              <span onClick={() => trackExpandedRows(row)}>
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? (
                    <FontAwesomeIcon icon={faAngleDown} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleRight} />
                  )}
                </span>
              </span>{" "}
              <span
                className="dropdown"
                onClick={() => {
                  refreshPrice(row);
                }}
              >
                <FontAwesomeIcon
                  className={updatingPrice ? "refresh-start" : ""}
                  icon={faSync}
                  size="xs"
                />
              </span>
            </>
          );
        },
      },
      {
        Header: "Symbol",
        accessor: (d) => d.symbol,
      },
      // {
      //   Header: "Price Date",
      //   accessor: (d) => d.current_price_date,
      // },
      {
        Header: "Shares",
        accessor: (d) => d.shares,
      },
      {
        Header: "Market Price",
        accessor: (d) => Number(d.current_price).toFixed(2),
      },
      {
        Header: "Avg Cost Per Share",
        accessor: (d) => Number(d.avg_cost_per_share).toFixed(2),
      },

      {
        Header: "Book Value",
        accessor: (d) => {
          let bv = Number(d.book_value).toFixed(2);
          return Number(bv).toLocaleString("en");
        },
      },
      {
        Header: "Market Value",
        accessor: (d) => {
          let mv = Number(d.market_value).toFixed(2);
          return Number(mv).toLocaleString("en");
        },
      },
      {
        Header: "Total Gain/(Loss)",
        accessor: (d) => {
          const bv = Number(d.book_value);
          const mv = Number(d.market_value);

          let gain_loss = mv - bv;
          gain_loss = gain_loss.toFixed(2);
          gain_loss = Number(gain_loss).toLocaleString("en");

          if (Number(gain_loss) < 0) {
            gain_loss = "(" + gain_loss.slice(1) + ")";
          }

          return gain_loss;
        },
      },
      {
        id: "deleterow",
        // eslint-disable-next-line react/display-name
        Cell: ({ row }) => {
          return (
            <>
              <span
                className="dropdown"
                onClick={() => handleClickDeleteHolding(row)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="xs" />
              </span>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (portfolioHoldings.length === 0) {
      dispatch(loadPortfolioHoldings(portfolio_id));
    }
  }, []);

  useEffect(() => {
    // console.log("2nd useEffect: portfolioHoldings: ", portfolioHoldings);

    let priceRefresh = null;
    if (portfolioHoldings.length > 0 && marketPriceHoldings.length === 0) {
      // priceRefresh = setInterval(() => getQuotes(), 15 * 60 * 1000);
      setMarketPriceHoldings(portfolioHoldings);
    }

    return () => clearInterval(priceRefresh);
  }, [portfolioHoldings]);

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });

  //   return ref.current;
  // };
  // const prevHoldings = usePrevious(marketPriceHoldings);

  // useEffect(() => {
  //   if (prevHoldings && prevHoldings.length < marketPriceHoldings.length) {
  //     console.log("<:", marketPriceHoldings);
  //     setExpandedRows((prev) => prev.map((id) => (++id).toString()));
  //   }

  //   if (prevHoldings && prevHoldings.length > marketPriceHoldings.length) {
  //     console.log(">:", marketPriceHoldings);
  //     setExpandedRows((prev) => prev.map((id) => (--id).toString()));
  //   }

  //   //   console.log(
  //   //     "3rd useEffect: marketPriceHoldings: ",
  //   //     marketPriceHoldings,
  //   //     "expandedRows: ",
  //   //     expandedRows,
  //   //     "currentRowIds: ",
  //   //     currentRowIds,
  //   //     "idRowToRemove:",
  //   //     idRowToRemove
  //   //   );
  // }, [marketPriceHoldings]);

  const renderRowSubComponent = (props) => {
    return (
      <TransactionTable
        setMarketPriceHoldings={setMarketPriceHoldings}
        {...props}
      />
    );
  };

  const handleClickDeleteHolding = (holding) => {
    const symbol = holding.original.symbol;
    const port_id = holding.original.port_id;
    const deletedHolding = { symbol, port_id };
    setDeletedHolding(deletedHolding);

    toggleDeleteTransaction(!isDeleteTransOpen);

    console.log(
      "handleClickDeleteHolding: symbol: ",
      symbol,
      " port_id: ",
      port_id
    );
  };

  function onDelete(e) {
    e.preventDefault();
    deleteHolding(deletedHolding);
    toggleDeleteTransaction(!isDeleteTransOpen);
  }

  const deleteHolding = async ({ symbol, port_id }) => {
    const deletedObject = {
      deletedTransSymbol: symbol,
      deletedTransPortId: port_id,
    };

    try {
      const response = await deletePortfolioHoldingApi(deletedObject);

      console.log(
        "delete portfolioHoldings:",
        portfolioHoldings,
        "marketPriceHoldings: ",
        marketPriceHoldings
      );

      setMarketPriceHoldings((prev) =>
        prev.filter((hold) => hold.symbol !== symbol)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // single symbol market price refresh
  const refreshPrice = async (row) => {
    setRefreshSpinner(row.id);
    const symbol = [row.original.symbol];
    // get the price from py yahoo
    const addSymbolGetPrice = await getQuotesApi(symbol);
    setRefreshSpinner(null);
    const quote = addSymbolGetPrice.quotes;
    const splitData = quote.split(":");
    const priceData = splitData[1].trim();
    let updatedPrice = priceData.slice(0, -1);

    // updatedPrice = 10;
    console.log("updatedPrice:", updatedPrice);

    setPrices((prev) => {
      return { ...prev, [symbol]: updatedPrice };
    });

    // update the local holdings state
    setMarketPriceHoldings((prev) =>
      prev.map((holding) => {
        if (holding.symbol === symbol[0]) {
          return {
            ...holding,
            current_price: updatedPrice,
            market_value: updatedPrice * holding.shares,
          };
        }
        return holding;
      })
    );

    // update the currentprice table
    updatePrices({ [symbol[0]]: updatedPrice });
    // const updatePrice = await updatePricesApi(addSymbolPriceTable);
  };

  // function that gets called periodically to get market prices
  const getQuotes = async () => {
    const symbols = portfolioHoldings
      .map((holding) => holding.symbol)
      .slice(0, 3);
    console.log("getQuotes symbols: ", symbols);
    // get the prices for all holdings from py yahoo
    try {
      setRefreshSpinner("all");
      const data = await getQuotesApi(symbols);
      const quotesString = data.quotes.slice(1, data.quotes.length - 2);
      const quotesArray = quotesString.split(",");
      let quotes = quotesArray.reduce((accum, curr) => {
        const splitData = curr.split(":");
        const tickerData = splitData[0].trim();
        const priceData = splitData[1].trim();

        const ticker = tickerData.slice(1, tickerData.length - 1);
        accum = { ...accum, [ticker]: priceData };
        return accum;
      }, {});

      // quotes = { AAL: "11", AAPL: "140" };
      console.log("getQuotes quotes: ", quotes);

      setPrices(() => quotes);

      // update the local holdings state
      setMarketPriceHoldings((prev) =>
        prev.map((hold) => {
          const updatedHolding = {
            ...hold,
            current_price: quotes[hold.symbol],
            market_value: quotes[hold.symbol] * hold.shares,
          };
          setRefreshSpinner(null);
          return updatedHolding;
        })
      );

      // update the currentprice table
      updatePrices(quotes);
    } catch (error) {
      console.log(error);
    }
  };

  // update the currentprice table
  const updatePrices = async (quotes) => {
    try {
      await updatePricesApi(quotes);
      // console.log("updatedPrices", updatedPrices);
    } catch (error) {
      console.log(error);
    }
  };

  const addSymbol = () => {
    toggleAddSymbol(!isAddSymbolOpen);
  };

  return (
    <>
      <span className="dropdown" onClick={() => addSymbol()}>
        Add Symbol
      </span>
      {" | "}
      <span className="dropdown" onClick={() => getQuotes()}>
        Refresh All{" "}
        {refreshSpinner === "all" ? (
          <FontAwesomeIcon
            className={"refresh-start"}
            icon={faSync}
            size="xs"
          />
        ) : null}
      </span>
      &nbsp;
      <Table
        columns={columns}
        data={marketPriceHoldings}
        //   marketPriceHoldings && marketPriceHoldings.length > 0
        //     ? marketPriceHoldings
        //     : portfolioHoldings
        // }
        renderRowSubComponent={renderRowSubComponent}
        expandedRows={expandedRows}
        prices={prices}
        refreshSpinner={refreshSpinner}
      />
      <Modal
        show={isAddSymbolOpen}
        handleClose={() => toggleAddSymbol(!isAddSymbolOpen)}
      >
        <AddSymbol
          port_id={portfolio_id}
          handleClose={() => toggleAddSymbol(!isAddSymbolOpen)}
          marketPriceHoldings={marketPriceHoldings}
          setMarketPriceHoldings={setMarketPriceHoldings}
          setExpandedRows={setExpandedRows}
        />
      </Modal>
      <Modal
        show={isDeleteTransOpen}
        handleClose={() => toggleDeleteTransaction(!isDeleteTransOpen)}
      >
        <DeleteForm
          // transactionId={deleteTransactionId}
          handleClose={() => toggleDeleteTransaction(!isDeleteTransOpen)}
          onDelete={onDelete}
          type="holding"
        />
      </Modal>
    </>
  );
}

HoldingTable.propTypes = {
  match: PropTypes.object.isRequired,
  row: PropTypes.object,
};

export default withRouter(HoldingTable);
