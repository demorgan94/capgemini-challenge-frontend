import React, { useState } from "react";
import axios from "axios";
import ResultTable from "./ResultTable";

const Form = () => {
  const [data, setData] = useState({
    init_amount: 0,
    annual_contribution: 0,
    annual_increment: 0,
    investment_time: 0,
    investment_return: 0,
  });
  const [errors, setErrors] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const onInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let errorList = [];

    if (data.init_amount < 1000) {
      errorList.push("init_amount");
    }

    if (data.investment_time <= 0) {
      errorList.push("investment_time");
    }

    if (data.investment_return <= 0) {
      errorList.push("investment_return");
    }

    setErrors(errorList);

    if (errorList.length > 0) {
      return false;
    }

    axios
      .post("/api/investment", data)
      .then((response) => {
        setTableData(response.data);
        setDisplayTable(true);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <div className="col-4">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="inputInitAmount" className="form-label">
              Init Amount
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className={
                  hasError("init_amount")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="inputInitAmount"
                name="init_amount"
                value={data.init_amount}
                onChange={onInputChange}
                required
              />
              {hasError("init_amount") && (
                <div className="invalid-feedback">
                  Init amount should be greater or equals to $1,000.
                </div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputAnnualContribution" className="form-label">
              Annual Contribution
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="inputAnnualContribution"
                name="annual_contribution"
                value={data.annual_contribution || 0}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputAnnualIncrement" className="form-label">
              Annual Increment
            </label>
            <div className="input-group">
              <span className="input-group-text">%</span>
              <input
                type="number"
                className="form-control"
                id="inputAnnualIncrement"
                name="annual_increment"
                value={data.annual_increment || 0}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputInvestmentTime" className="form-label">
              Investment Time
            </label>
            <input
              type="number"
              className={
                hasError("investment_time")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="inputInvestmentTime"
              name="investment_time"
              value={data.investment_time}
              onChange={onInputChange}
              required
            />
            {hasError("investment_time") && (
              <div className="invalid-feedback">
                The investment time should be greater than 0.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="inputInvestmentReturn" className="form-label">
              Investment Return
            </label>
            <div className="input-group">
              <span className="input-group-text">%</span>
              <input
                type="number"
                className={
                  hasError("investment_return")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="inputInvestmentReturn"
                name="investment_return"
                value={data.investment_return}
                onChange={onInputChange}
                required
              />
              {hasError("investment_return") && (
                <div className="invalid-feedback">
                  The investment return should be greater than 0.
                </div>
              )}
            </div>
          </div>

          <div className="d-grid gap-2 col-6 mx-auto">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>

      <div className="col-6">
        {displayTable && <ResultTable investment={tableData} />}
      </div>
    </>
  );
};

export default Form;
