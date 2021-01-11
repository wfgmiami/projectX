/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTable, useRowSelect } from "react-table";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import Modal from "../common/Modal";
import EditPortfolio from "./EditPortfolio";

import { loadPortfolios } from "../../redux/actions/portfolioActions";
import { Checkbox } from "../common/Checkbox";
import CreatePortfolio from "./CreatePortfolio";

function Table({ columns, data, onSelectedRows }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Cell: ({ row, rows }) => {
              if (
                rows.filter((row) => row.isSelected).length < 1 ||
                row.isSelected
              ) {
                return <Checkbox {...row.getToggleRowSelectedProps()} />;
              } else {
                return (
                  <Checkbox
                    disabled={true}
                    {...row.getToggleRowSelectedProps()}
                  />
                );
              }
            },
          },
          ...columns,
        ];
      });
    }
  );

  React.useEffect(() => {
    onSelectedRows(selectedFlatRows);
  }, [selectedFlatRows]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
  onSelectedRows: PropTypes.func.isRequired,
};

function PortfolioTable() {
  // const columns = useMemo(() => COLUMNS, []);
  const [portfolioId, setPortfolioId] = useState(null);
  const [isCreatePortOpen, toggleCreatePort] = useState(false);
  const [isEditPortOpen, toggleEditPort] = useState(false);

  const dispatch = useDispatch();
  const portfolios = useSelector((state) => state.portfolios.portfoliosList);
  let portfolio_id = null;

  const dropdownRef = useRef(null);

  const columns = useMemo(
    () => [
      {
        Header: "Portfolio Name",
        accessor: (d) => d.port_name,
        Cell: ({ row }) => (
          <a href={`/portfolios/${row.original.port_id}`}>
            {row.original.port_name}
          </a>
        ),
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
    ],
    []
  );

  useEffect(() => {
    // console.log("useEffect: portfolios: ", portfolios);
    if (portfolios.length === 0) dispatch(loadPortfolios());

    const onClick = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        toggleEditPort(!isEditPortOpen);
      }
    };

    if (isEditPortOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isEditPortOpen, dropdownRef]);

  const onSelectedRows = (rows) => {
    portfolio_id = rows.length > 0 ? rows[0].original.port_id : null;
    setPortfolioId(portfolio_id);

    // console.log(
    //   "onSelectedRows: rows: ",
    //   rows,
    //   " portfolio_id: ",
    //   portfolio_id,
    //   " portfolio_name: ",
    //   portfolio_name
    // );
  };

  return (
    <>
      {portfolioId ? (
        <span
          className="dropdown"
          onClick={() => toggleEditPort(!isEditPortOpen)}
        >
          Edit Portfolio
        </span>
      ) : (
        <span>Edit Portfolio</span>
      )}
      <EditPortfolio
        ref={dropdownRef}
        show={isEditPortOpen}
        handleClose={toggleEditPort}
        portfolioId={portfolioId}
      ></EditPortfolio>
      {" | "}
      <span
        className="dropdown"
        onClick={() => toggleCreatePort(!isCreatePortOpen)}
      >
        Create Portflio
      </span>
      <Modal
        show={isCreatePortOpen}
        handleClose={() => toggleCreatePort(!isCreatePortOpen)}
      >
        <CreatePortfolio
          handleClose={() => toggleCreatePort(!isCreatePortOpen)}
        />
      </Modal>
      &nbsp;
      <Table
        columns={columns}
        data={portfolios}
        onSelectedRows={onSelectedRows}
      />
    </>
  );
}

PortfolioTable.propTypes = {
  row: PropTypes.string,
  portfolios: PropTypes.array,
};

export default PortfolioTable;
