import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { updateTransaction as updateTransactionApi } from "../../api/transactionApi";
import {
  addSymbolPriceTable as addSymbolPriceTableApi,
  getQuotes as getQuotesApi,
} from "../../api/marketDataApi";

import AddSymbolForm from "./AddSymbolForm";

function AddSymbol({ handleClose, port_id, setMarketPriceHoldings }) {
  const [symbol, setSymbol] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  // const dispatch = useDispatch();
  const portfolioHoldings = useSelector((state) => state.holdings.holdingsList);

  useEffect(() => {}, []);

  function handleChange(event) {
    const { value } = event.target;
    const symbol = value.toUpperCase();
    // console.log("symbol: ", symbol);
    setSymbol(symbol);
  }

  function resetOnClose() {
    setSymbol("");
    setErrors({ onSave: "" });
    setSaving(false);
    handleClose();
  }

  const saveAddedSymbol = async (event) => {
    event.preventDefault();

    const holdExistArray = portfolioHoldings.filter(
      (holding) =>
        holding.symbol === symbol && Number(holding.port_id) === Number(port_id)
    );

    if (holdExistArray.length > 0) {
      setErrors({ symbol: "Symbol already exist in the portfolio" });
      return;
    }
    setSaving(true);

    try {
      // pass symbol in an array as it uses the API that handles multiple symbols
      const addSymbolGetPrice = await getQuotesApi([symbol]);
      const quote = addSymbolGetPrice.quotes;
      console.log("quote:", quote);
      const splitData = quote.split(":");
      const priceData = splitData[1].trim();
      const price = priceData.slice(0, -1);
      const addSymbolPriceTable = { price, symbol };

      console.log("addSymbolPriceTable:", addSymbolPriceTable);

      const addSymbolPriceTableResponse = await addSymbolPriceTableApi(
        addSymbolPriceTable
      );
      const addedHolding = { symbol, port_id, trade_date: new Date() };
      const addSymbolResponse = await updateTransactionApi(addedHolding);
      const addedSymbol = addSymbolResponse.holding;

      setMarketPriceHoldings((prev) => [addedSymbol, ...prev]);
      handleClose();
      setSaving(false);
      console.log(
        "addSymbolResponse: ",
        addSymbolResponse,
        " addedSymbol: ",
        addedSymbol
      );
    } catch (error) {
      setSaving(false);
      console.log(error);
    }
  };

  return (
    <AddSymbolForm
      symbol={symbol}
      errors={errors}
      onChange={handleChange}
      onSave={saveAddedSymbol}
      handleClose={resetOnClose}
      saving={saving}
    />
  );
}

AddSymbol.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddSymbol;
