import React, { useState } from "react";
import TextField from "../components/textField";
import EntityAPI from "../servers/entity";
import Button from "../html/button";
import Image from "../html/image";

export default function LiabilityForm({ element }) {
  const [dueDate, setDueDate] = useState(element.dueIn);
  const [liability, setLiability] = useState(element.liability);
  const [amount, setAmount] = useState(element.amount);
  const [payed, setPayed] = useState(element.payed);
  const [debtor, setDebtor] = useState(element.source);

  const validationState = {
    debtor: {
      validDef: {
        required: true,
        restricted: false,
      }
    }
  };

  const handleDueChange = (e) => {
    setDueDate(e.target.value);
  };
  const handleDebtorChange = (val) => {
    setDebtor(val);
  };
  const handleAmountChange = (e) => {
    setAmount(Number.parseFloat(e.target.value));
  };
  const handlePayedChange = (e) => {
    setPayed(e.target.checked);
  };
  const handleDirectionChange = (e) => {
    setLiability(e.target.value !== 'income');
  };

  const handleSave = async () => {
    const obj = { ...element };
    obj.dueIn = dueDate;
    obj.liability = liability;
    obj.amount = Number.parseFloat(amount);
    obj.payed = payed;
    obj.source = debtor;
    try {
      await saveLiability(obj);
    } catch (ex) {
      // TODO: Add toast or error handling
      console.error(ex);
    }
  };

  const saveLiability = async (updatedLiability) => {
    if (updatedLiability && updatedLiability.cashflowId && updatedLiability._id && updatedLiability.elementId) {
      const lApi = new EntityAPI('liability');
      await lApi.save(updatedLiability);
    }
  };

  return (
    <div className="liability">
      <h2>Update Liability</h2>
      <div className="buttons" id="ActionButtons">
        <Button className="form-button" id="Save" onClick={handleSave}>
          <Image name="save" />
        </Button>
      </div>
      <TextField
        id="debtor"
        label="Debtor"
        value={debtor}
        validDef={validationState.debtor.validDef}
        update={handleDebtorChange}
      />
      <div className="amountLiability">
        <label htmlFor="liability-amount">Amount</label>
        <input
          type="number"
          id="liability-amount"
          value={amount}
          onChange={handleAmountChange}
        />
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
      <div className="payed">
        <label>
          <input
            type="checkbox"
            checked={payed}
            onChange={handlePayedChange}
          />
          Payed
        </label>
      </div>
      <div className="dueDate">
        <label htmlFor="liability-due">Due Date</label>
        <input
          type="date"
          id="liability-due"
          value={dueDate}
          onChange={handleDueChange}
        />
      </div>
    </div>
  );
}
