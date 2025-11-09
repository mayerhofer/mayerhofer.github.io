import React, { useState, useEffect } from "react";
import EntityAPI from "../servers/entity";

const LiabilityReport = ({ data, id }) => {
  const [cashflows, setCashflows] = useState([]);

  useEffect(() => {
    const cfApi = new EntityAPI("cashflow");
    const filter = {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth(),
    };
    cfApi.get(filter).then(cfData => {
      const result = cfData.filter(cf => data.find(l => l.cashflowId === cf.elementId));
      setCashflows(result);
    });
  }, [data]);

  const getCf = (liability) => cashflows.find(cf => cf.elementId === liability.cashflowId);

  // Calculate report rows
  const report = data.reduce((a, b) => {
    let row = a.find(obj => obj.debtor === b.source && obj.currency === getCf(b)?.currency);
    if (!row) {
      a.push({
        debtor: b.source,
        credit: b.liability ? 0 : b.amount,
        debit: b.liability ? b.amount : 0,
        currency: getCf(b)?.currency,
      });
    } else {
      if (b.liability) {
        row.debit += b.amount;
      } else {
        row.credit += b.amount;
      }
    }
    return a;
  }, []);
  report.forEach(row => {
    row.debit = Math.round(100 * row.debit) / 100;
    row.credit = Math.round(100 * row.credit) / 100;
  });

  // Render report rows
  return (
    <div id={id} className="liabilityReport">
      {report.map((row, idx) => (
        <div key={idx} className="liabRepRow">
          <span className="debtor">{row.debtor}</span>
          <span className="credit">Credit: {row.credit}</span>
          <span className="debit">Debit: {row.debit}</span>
          <span className="currency">{row.currency}</span>
        </div>
      ))}
    </div>
  );
};

export default LiabilityReport;
