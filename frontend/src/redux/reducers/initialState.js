const registerUser = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  phone: "",
  applicationSuccess: "",
};

const newPortfolio = {
  port_id: null,
  port_name: "",
  currency: "",
  asset_class: "",
};

const portfolios = {
  portfolio: {},
  porfolioLoadedStatus: "",
  portfoliosList: [],
  porfoliosLoadedStatus: "",
  error: "",
  // TODO: Need to get from db - table: portfolio_attributes
  currency: [
    { currency_id: 1, currency_abbreviation: "USD" },
    { currency_id: 2, currency_abbreviation: "EUR" },
    { currency_id: 3, currency_abbreviation: "JPY" },
    { currency_id: 4, currency_abbreviation: "CNY" },
    { currency_id: 5, currency_abbreviation: "INR" },
  ],
  asset_class: [
    { asset_class_id: 1, asset_class_name: "Cash" },
    { asset_class_id: 2, asset_class_name: "Equity" },
    { asset_class_id: 3, asset_class_name: "Fixed Income" },
    { asset_class_id: 4, asset_class_name: "Equity ETF" },
    {
      asset_class_id: 5,
      asset_class_name: "Fixed Income ETF",
    },
    { asset_class_id: 6, asset_class_name: "Multi-Asset" },
  ],
  newPortfolio,
};

export default {
  user: { signinStatus: false },
  apiCallsInProgress: 0,
  contactForm: { isContactFormSent: false },
  registerUser,
  portfolios,
};
