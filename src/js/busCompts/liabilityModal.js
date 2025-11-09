import React, { useState, useEffect } from "react";
import { currencies } from "../templates";
import TextField from "../components/textField";
import Button from "../html/button";

export default function LiabilityModal({ show, amount: initialAmount = 10, currency: initialCurrency, addLiability }) {
  const [liability, setLiability] = useState(true);
  const [amount, setAmount] = useState(initialAmount);
  const [currency, setCurrency] = useState(initialCurrency);
  const [debtor, setDebtor] = useState('Cris Carnaval');

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);
  useEffect(() => {
    setCurrency(initialCurrency);
  }, [initialCurrency]);

  const handleDebtorChange = (val) => {
    setDebtor(val);
  };
  const handleCurrencyUpdate = (e) => {
    setCurrency(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleDirectionChange = (e) => {
    const isLiability = e.target.value !== 'income';
    setLiability(isLiability);
    setAmount(isLiability ? initialAmount : initialAmount / 2);
  };
  const handleSave = () => {
    let dt = new Date();
    const obj = {
      dueIn: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      source: debtor,
      liability: liability,
      amount: Number.parseFloat(amount),
      currency: currency,
      cashflowId: -1,
      elementId: -1,
      payed: false,
      updated: dt.getTime()
    };
    addLiability(obj);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="liability">
      <h1>Add Liability</h1>
      <div className="table__header">
        <Button className="table__header-add" id="AddNewLiability" onClick={handleSave}>
          <span>+</span>
        </Button>
      </div>
      <TextField
        id="debtor"
        label="Debtor"
        value={debtor}
        validDef={{ required: true, restricted: false, options: [] }}
        update={handleDebtorChange}
      />
      <div className="amountField">
        <label htmlFor="liability-amount">Amount</label>
        <input
          type="number"
          id="liability-amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <span className="currency">{currencies[currency] ?? '?'}</span>
        <div className="currencyList">
          {Object.keys(currencies).map((key) => (
            <label key={key}>
              <input
                type="radio"
                name="liability-currency"
                value={key}
                checked={currency === key}
                onChange={handleCurrencyUpdate}
              />
              {currencies[key]}
            </label>
          ))}
        </div>
        <div className="direction">
          <label>
            <input
              type="radio"
              name="liability-direction"
              value="expense"
              checked={liability}
              onChange={handleDirectionChange}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              name="liability-direction"
              value="income"
              checked={!liability}
              onChange={handleDirectionChange}
            />
            Income
          </label>
        </div>
      </div>
    </div>
  );
}