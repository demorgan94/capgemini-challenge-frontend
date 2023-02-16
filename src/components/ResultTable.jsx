import axios from "axios";
import React, { useEffect, useState } from "react";

const ResultTable = ({ investment }) => {
  const [profit, setProfit] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    calculateProfit(investment);
    setFinalAmount(investment[investment.length - 1].final_amount);
  }, [investment]);

  const calculateProfit = (data) => {
    axios
      .post("/api/profit", data)
      .then((response) => {
        setProfit(response.data);
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="text-center">
        <p>
          <strong>Profit: </strong> ${profit}
        </p>
        <p>
          <strong>Final Amount: </strong>${finalAmount}
        </p>
      </div>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Init Amount</th>
            <th scope="col">Contribution</th>
            <th scope="col">Investment Return</th>
            <th scope="col">Final Amount</th>
          </tr>
        </thead>
        <tbody>
          {investment.map((value, i) => {
            return (
              <tr key={i}>
                <th scope="row">{value.year}</th>
                <td>${value.init_amount}</td>
                <td>${value.contribution}</td>
                <td>${value.investment_return}</td>
                <td>${value.final_amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ResultTable;
