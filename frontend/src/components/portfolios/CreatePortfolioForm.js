import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
// import SelectInput from "../common/SelectInput";

const CreatePortfolioForm = ({
  portfolio,
  // portfolioCurrency,
  // portfolioAssetClass,
  onSave,
  onChange,
  errors = {},
  handleClose,
  saving,
}) => {
  // console.log("portfolio: ", portfolio, " errors: ", errors);

  return (
    <form onSubmit={onSave}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <h4 style={{ textAlign: "center" }}>Create Portfolio</h4>
      <TextInput
        name="port_name"
        label="Portfolio Name"
        value={portfolio.port_name}
        error={errors.port_name}
        onChange={onChange}
      />
      {/* <SelectInput
        name="asset_class"
        label="Portfolio Asset Class"
        value={portfolio.asset_class || ""}
        defaultOption={
          portfolio.asset_class_name
            ? portfolio.asset_class_name
            : "Select Portfolio Asset Class"
        }
        options={portfolioAssetClass.map((type) => ({
          value: type.asset_class_name,
          text: type.asset_class_name,
        }))}
        onChange={onChange}
      />
      <SelectInput
        name="currency"
        label="Portfolio Currency"
        value={portfolioCurrency.currency || ""}
        defaultOption={
          portfolio.currency ? portfolio.currency : "Select Portfolio Currency"
        }
        options={portfolioCurrency.map((currency) => ({
          value: currency.currency_abbreviation,
          text: currency.currency_abbreviation,
        }))}
        onChange={onChange}
      /> */}
      &nbsp;
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>{" "}
      <button type="button" className="btn btn-secondary" onClick={handleClose}>
        Cancel
      </button>
    </form>
  );
};

CreatePortfolioForm.propTypes = {
  errors: PropTypes.object,
  portfolio: PropTypes.object.isRequired,
  // portfolioCurrency: PropTypes.array.isRequired,
  // portfolioAssetClass: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CreatePortfolioForm;
