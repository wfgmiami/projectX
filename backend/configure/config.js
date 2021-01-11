// require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  PGUSER: "postgres",
  PGHOST: "localhost",
  PGPASSWORD: "",
  PGDATABASE: "investment",
  PGPORT: 5432,
};
