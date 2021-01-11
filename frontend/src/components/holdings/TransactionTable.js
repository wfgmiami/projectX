/* eslint-disable react/display-name */
/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useGroupBy,
  useExpanded,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faSave,
  faTimes,
  faCaretSquareDown,
  faCaretSquareUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
// import { COLUMNS } from "./columns_transaction_table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  loadTransactions as loadTransactionsApi,
  loadTransaction as loadTransactionApi,
  updateTransaction as updateTransactionApi,
  deleteTransaction as deleteTransactionApi,
} from "../../api/transactionApi";
import { loadPortfolioHoldings } from "../../redux/actions/holdingAction";
import DeleteForm from "./DeleteForm";
import Modal from "../common/Modal";
import { transactionIsValid } from "../common/FormIsValid";
// import { updateTransaction } from "../../redux/actions/transactionActions";

const EditableCell = ({
  value: initialValue,
  row: { index, original },
  column: { id },
  updateMyData,
  errors,
  column,
  row,
}) => {
  const [value, setValue] = useState(initialValue);
  const isEditing = original.isEditing;
  let error = "";
  // console.log("errors: ", errors, error);
  if (Object.keys(errors).length > 0) {
    error = errors[id];
  }
  // console.log("errors: ", errors, error);

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // updateMyData(index, id, newValue);
  };

  const onBlur = (e) => {
    updateMyData(index, id, value, e);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let retObj = null;

  if (id === "book_value" || id === "market_value" || id === "gain_loss") {
    retObj = <input value={value || ""} disabled={true} />;
  } else {
    retObj = (
      <>
        <input
          value={value || ""}
          disabled={!isEditing}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && error.length && errors.row_index === index ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}
      </>
    );
  }
  return retObj;
};

const defaultColumn = {
  Cell: EditableCell,
};

function Table({ columns, data, updateMyData, errors, addTransaction }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
      errors,
    },
    useGroupBy,
    useSortBy,
    useExpanded
    // useBlockLayout
    // useResizeColumns
  );

  return (
    <>
      <table {...getTableProps()} className="transactions">
        <thead className="header">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => {
                column.id === "edit" ? (column.canSort = false) : column;
                // console.log(
                //   "column: ",
                //   column,
                //   "column.getSortByToggleProps()",
                //   column.getSortByToggleProps()
                // );
                return (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th"
                  >
                    {column.id === "edit" ? (
                      <span
                        className="dropdown"
                        onClick={() => addTransaction()}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    ) : null}
                    {column.render("Header")}
                    {/* <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? "isResizing" : ""
                        }`}
                      /> */}
                    <span>
                      {" "}
                      {column.id !== "edit" ? (
                        column.isSorted ? (
                          column.isSortedDesc ? (
                            <FontAwesomeIcon icon={faCaretSquareDown} />
                          ) : (
                            <FontAwesomeIcon icon={faCaretSquareUp} />
                          )
                        ) : (
                          ""
                        )
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="tb">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}

                      {/* {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? (
                              <FontAwesomeIcon icon={faAngleDown} />
                            ) : (
                              <FontAwesomeIcon icon={faAngleRight} />
                            )}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )} */}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
};

function TransactionTable(props) {
  const [transactionsData, setTransactionsData] = useState([]);
  const [isDeleteTransOpen, toggleDeleteTransaction] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState();
  const [deleteRowId, setDeleteRowId] = useState();
  const [errors, setErrors] = useState({});

  const holdingDetails = props.row.original;
  const { symbol } = holdingDetails;
  const { current_price } = holdingDetails;
  const { match, setMarketPriceHoldings, prices } = props;
  const portfolioId = match.params.portfolio_id;

  const getToggleRowExpandedProps = props.row.getToggleRowExpandedProps;

  // const columns = useMemo(() => COLUMNS, []);

  const expandRow = getToggleRowExpandedProps().onClick;
  const isExpanded = props.row.isExpanded;

  // console.log(
  //   "transactionsData:",
  //   transactionsData,
  //   "props: ",
  //   props,
  //   "isExpanded:",
  //   isExpanded,
  //   "holdingDetails",
  //   holdingDetails
  // );

  const newTransactionModel = {
    row_id: null,
    symbol,
    trade_date: new Date(),
    shares: null,
    purchase_price: null,
    book_value: null,
    market_value: null,
    gain_loss: null,
    broker: "",
    comment: "",
    port_id: portfolioId,
    isEditing: true,
  };

  const addTransaction = () => {
    let lastRowId = Math.max.apply(
      Math,
      transactionsData.map((trans) => (trans.row_id ? trans.row_id : 0))
    );

    if (isNaN(lastRowId)) lastRowId = 0;
    // there should be at least one transaction already existing
    // const symbol = transactionsData[0].symbol;

    const newTransaction = {
      ...newTransactionModel,
      row_id: lastRowId + 1,
    };
    console.log(
      "addTransaction: lastRowId:",
      lastRowId,
      "newTransaction:",
      newTransaction
    );
    setTransactionsData((prev) => [...prev, newTransaction]);
  };

  const setTradeDate = (date, cellObj) => {
    const trans_id = cellObj.row.original.trans_buy_id;
    setTransactionsData((prev) =>
      prev.map((rowData) => {
        if (rowData.trans_buy_id === trans_id) {
          rowData.trade_date = date;
        }
        return rowData;
      })
    );
  };
  const isCalendarDisabled = (cellObj) => {
    const isEditing = cellObj.row.original.isEditing;
    return !isEditing;
  };

  const updateTransaction = async (updatedTransaction) => {
    console.log(
      "updatedTransaction:",
      updatedTransaction,
      "port id ",
      portfolioId
    );

    try {
      const response = await updateTransactionApi(updatedTransaction);
      const updatedHolding = response.holding;
      console.log("update response: ", response);

      setMarketPriceHoldings((prev) =>
        prev.map((holding) =>
          holding.symbol === updatedHolding.symbol ? updatedHolding : holding
        )
      );
      expandRow();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditRow = (cellObj) => {
    const rowIndex = cellObj.row.index;
    const trans_id = cellObj.row.original.trans_buy_id;
    console.log("handleClickEditRow: cellObj: ", cellObj);
    const isEditing = cellObj.row.original.isEditing;

    if (isEditing) {
      if (trans_id) {
        const updatedTransaction = transactionsData.find(
          (trans) => trans.trans_buy_id === trans_id
        );
        // TODO: check if there was any change to the transaction
        // TODO: to verify the mandotory fields are filled
        updateTransaction(updatedTransaction);
        setTransactionsData((prev) =>
          prev.map((rowData, index) => {
            if (rowIndex === index) {
              return { ...rowData, isEditing: !rowData.isEditing };
            }
            return rowData;
          })
        );
      } else {
        const newTransaction = cellObj.row.original;
        const isValid = transactionIsValid(newTransaction, setErrors, rowIndex);
        console.log("newTransaction", newTransaction, isValid);
        if (isValid) {
          updateTransaction(newTransaction);
          setTransactionsData((prev) =>
            prev.map((rowData, index) => {
              if (rowIndex === index) {
                return { ...rowData, isEditing: !rowData.isEditing };
              }
              return rowData;
            })
          );
        }
      }
    } else {
      setTransactionsData((prev) =>
        prev.map((rowData, index) => {
          if (rowIndex === index) {
            return { ...rowData, isEditing: !rowData.isEditing };
          }
          return rowData;
        })
      );
    }
  };

  const deleteTransaction = async (deletedTransId) => {
    const deletedTransaction = transactionsData.filter(
      (trans) => trans.trans_buy_id === deletedTransId
    )[0];
    console.log("trans data ", transactionsData);
    const deletedTransSymbol = deletedTransaction.symbol;
    const deletedTransPortId = deletedTransaction.port_id;

    const deletedObject = {
      deletedTransId,
      deletedTransSymbol,
      deletedTransPortId,
    };

    console.log(
      "deletedObject: ",
      deletedObject,
      "deletedTransaction",
      deletedTransaction
    );

    try {
      const response = await deleteTransactionApi(deletedObject);

      console.log("delete response:", response);

      setTransactionsData((prev) =>
        prev.filter((trans) => trans.trans_buy_id !== deletedTransId)
      );
      const updatedHolding = response.holding;

      // when the only one or the last transaction is deleted - remove symbol
      if (!updatedHolding) {
        setMarketPriceHoldings((prev) =>
          prev.filter((holding) => holding.symbol !== deletedTransSymbol)
        );
      } else {
        setMarketPriceHoldings((prev) =>
          prev.map((holding) =>
            holding.symbol === updatedHolding.symbol ? updatedHolding : holding
          )
        );
        expandRow();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDeleteRow = (cellObj) => {
    const deleteTransactionId = cellObj.row.original.trans_buy_id;
    const deleteRowId = cellObj.row.original.row_id;

    if (deleteTransactionId === undefined) {
      setDeleteRowId(deleteRowId);
    } else {
      setDeleteTransactionId(deleteTransactionId);
    }

    toggleDeleteTransaction(!isDeleteTransOpen);

    console.log(
      "handleClickDeleteRow: deleteTransactionId: ",
      deleteTransactionId,
      "deleteRowId",
      deleteRowId,
      "cellObj:",
      cellObj
    );
  };

  function onDelete(e) {
    e.preventDefault();

    if (deleteTransactionId === undefined) {
      setTransactionsData((prev) =>
        prev.filter((trans) => trans.row_id !== deleteRowId)
      );
    } else {
      deleteTransaction(deleteTransactionId);
    }

    toggleDeleteTransaction(!isDeleteTransOpen);
    setErrors({});
    console.log("onDelete: deleteTransactionId: ", deleteTransactionId);
  }

  const loadTransaction = async (transId) => {
    try {
      const { transaction } = await loadTransactionApi(transId);
      const trans_id = transaction.trans_buy_id;

      setTransactionsData((prev) =>
        prev.map((trans) => {
          if (trans.trans_buy_id === trans_id) {
            return transaction;
          }
          return trans;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancelRow = (cellObj, e) => {
    e.stopPropagation();
    const rowIndex = cellObj.row.index;
    const trans_id = cellObj.row.original.trans_buy_id;

    setErrors({});

    if (trans_id === undefined) {
      const row_id = cellObj.row.original.row_id;
      const symbol = cellObj.row.original.symbol;

      setTransactionsData((prev) =>
        prev.map((trans) => {
          if (trans.row_id === row_id) {
            return { ...newTransactionModel, row_id: row_id, symbol: symbol };
          }
          return trans;
        })
      );
    } else {
      loadTransaction(trans_id);
    }

    console.log(
      "handleClickCancelRow: cellObj: ",
      cellObj,
      "transactionsData: ",
      transactionsData,
      "trans_id:",
      trans_id,
      "rowIndex: ",
      rowIndex
    );

    setTransactionsData((prev) =>
      prev.map((rowData, index) => {
        if (rowIndex === index) {
          return { ...rowData, isEditing: !rowData.isEditing };
        }
        return rowData;
      })
    );
  };

  const columns = useMemo(() => [
    {
      id: "edit",
      accessor: "edit",
      Cell: (cellObj) => (
        <>
          <span
            className="dropdown"
            onClick={() => handleClickEditRow(cellObj)}
          >
            {cellObj.row.original.isEditing ? (
              <>
                <FontAwesomeIcon icon={faSave} />{" "}
                <span
                  className="dropdown"
                  onClick={(e) => handleClickCancelRow(cellObj, e)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </>
            ) : (
              <FontAwesomeIcon icon={faPencilAlt} />
            )}
          </span>

          <span
            className="dropdown"
            onClick={() => handleClickDeleteRow(cellObj)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </>
      ),
    },
    {
      id: "trade_date",
      Header: "Trade Date",
      // accessor: (d) => {
      // const objectTradeDate = new Date(Date.parse(d.trade_date));
      // const formattedTradeDate = objectTradeDate.toLocaleDateString();
      // return formattedTradeDate;
      // },

      Cell: (cellObj) => {
        let tradeDate = new Date();

        if (cellObj.row.original.trade_date) {
          tradeDate = new Date(Date.parse(cellObj.row.original.trade_date));
        }
        const objectTradeDate = tradeDate;

        const btnStyle = isCalendarDisabled(cellObj)
          ? { cursor: "not-allowed" }
          : { cursor: "pointer" };

        const CustomCalendarInput = ({ value, onClick }) => (
          <button
            style={btnStyle}
            className="example-custom-input"
            onClick={onClick}
          >
            {value}
          </button>
        );
        const CalendarInput = React.forwardRef((props, ref) => (
          <CustomCalendarInput innerRef={ref} {...props} />
        ));
        return (
          <DatePicker
            selected={objectTradeDate}
            onChange={(date) => setTradeDate(date, cellObj)}
            customInput={<CalendarInput />}
            disabled={isCalendarDisabled(cellObj)}
            showMonthDropdown
            showYearDropdown
          />
        );
      },
    },
    {
      id: "shares",
      Header: "Shares",
      accessor: (d) =>
        Number(d.shares) % 1 != 0
          ? Number(d.shares).toFixed(2)
          : Math.round(d.shares, 0),
    },
    {
      id: "purchase_price",
      Header: "Purchase Price",
      accessor: (d) =>
        Number(d.purchase_price) % 1 != 0
          ? Number(d.purchase_price).toFixed(2)
          : Math.round(d.purchase_price, 0),
    },
    {
      id: "book_value",
      Header: "Book Value",
      accessor: (d) =>
        Number(d.book_value) % 1 != 0
          ? Number(d.book_value).toFixed(2)
          : Math.round(d.book_value, 0),
    },
    {
      id: "market_value",
      Header: "Market Value",
      accessor: (d) => Number(d.market_value).toFixed(2),
    },
    {
      id: "gain_loss",
      Header: "Lot Gain / (Loss)",
      accessor: (d) => Number(d.gain_loss).toFixed(2),
    },
    {
      id: "broker",
      Header: "Broker Account",
      accessor: "broker",
    },
    {
      id: "comment",
      Header: "Comment",
      accessor: "comment",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbol = props.row.original.symbol;
        const trans = { portfolioId, symbol };
        const response = await loadTransactionsApi(trans);
        // console.log("fetchData: response", response);
        const transactions = response.transactions;
        const withIsEditableTrans = transactions.map((trans) => ({
          ...trans,
          isEditing: false,
        }));

        setTransactionsData(withIsEditableTrans);
      } catch (err) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("UseEffect prices: ", prices);
    if (Object.keys(prices).length > 0) {
      const symbols = Object.keys(prices);

      setTransactionsData((prev) => {
        return prev.map((trans) => {
          if (symbols.includes(trans.symbol)) {
            const updatedMarketValue =
              Number(trans.shares) * Number(prices[trans.symbol]);
            const updatedUGL = updatedMarketValue - Number(trans.book_value);
            return {
              ...trans,
              market_value: updatedMarketValue,
              gain_loss: updatedUGL,
            };
          }
          return trans;
        });
      });
    }
  }, [prices]);

  const updateMyData = (rowIndex, columnId, value, e) => {
    // console.log("columnId: ", columnId, " value: ", value);
    setTransactionsData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          let book_value = null;
          let market_value = null;
          let gain_loss = null;
          let new_purchasePrice = old[rowIndex].purchase_price;
          let new_shares = old[rowIndex].shares;

          if (!new_purchasePrice && columnId === "purchase_price") {
            new_purchasePrice = value;
          }

          if (!new_shares && columnId === "shares") {
            new_shares = value;
          }

          console.log("old[rowIndex]: ", old[rowIndex]);

          if (old[rowIndex].trans_buy_id) {
            if (columnId === "shares") {
              book_value = value * old[rowIndex].purchase_price;

              market_value = value * current_price;
              gain_loss = market_value - book_value;
            }
            if (columnId === "purchase_price") {
              book_value = value * old[rowIndex].shares;
              gain_loss = old[rowIndex].market_value - book_value;
            }
          } else if (old[rowIndex].row_id) {
            if (columnId === "shares") {
              market_value = value * current_price;
            }
            if (columnId === "shares" && new_purchasePrice) {
              book_value = value * new_purchasePrice;
              gain_loss = market_value - book_value;
            }
            if (columnId === "purchase_price" && new_shares) {
              book_value = value * new_shares;
              gain_loss = new_shares * current_price - book_value;
            }
          }

          return {
            ...old[rowIndex],
            [columnId]: value,
            ["book_value"]: book_value ? book_value : old[rowIndex].book_value,
            ["market_value"]: market_value
              ? market_value
              : old[rowIndex].market_value,
            ["gain_loss"]: gain_loss ? gain_loss : old[rowIndex].gain_loss,
            // ["portfolio_id"]: portfolioId,
          };
        }
        return row;
      })
    );
  };

  return (
    <>
      <Table
        columns={columns}
        data={transactionsData}
        updateMyData={updateMyData}
        addTransaction={addTransaction}
        errors={errors}
      />
      <Modal
        show={isDeleteTransOpen}
        handleClose={() => toggleDeleteTransaction(!isDeleteTransOpen)}
      >
        <DeleteForm
          transactionId={deleteTransactionId}
          handleClose={() => toggleDeleteTransaction(!isDeleteTransOpen)}
          onDelete={onDelete}
          type="transaction"
        />
      </Modal>
    </>
  );
}

TransactionTable.propTypes = {
  row: PropTypes.object,
};

// export default TransactionTable;

export default withRouter(TransactionTable);
