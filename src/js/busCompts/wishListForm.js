import React, { useState, useEffect } from "react";
import DateField from "../html/dateField";
import Button from "../html/button";
import TextField from "../components/textField";
import Image from "../html/image";
import EntityAPI from "../servers/entity";

const WishListForm = ({ element, data, id, labelOptions, labelImages }) => {
  const isEditMode = typeof element === 'object';
  
  // Initialize state
  const [state, setState] = useState({
    nextElementId: isEditMode ? element.elementId : 
      (data?.length > 0 ? data.map(d => d.elementId).filter(id => id > 0).sort((a,b)=>a-b).pop() + 1 : 1),
    date: isEditMode ? new Date(element.date) : new Date(),
    what: isEditMode ? element.what : '',
    labels: isEditMode ? [element.label] : [''],
    validationState: {
      what: {
        validDef: {
          required: true,
          restricted: false,
        },
      },
      labels: {
        validDef: {
          required: true,
          restricted: true,
          options: labelOptions,
        },
      },
    }
  });

  // Event handlers
  const handleUpdateDate = (e) => {
    setState(prevState => ({
      ...prevState,
      date: new Date(e.value)
    }));
  };

  const handleWhatChange = (what) => {
    setState(prevState => ({
      ...prevState,
      what
    }));
  };

  const handleLabelChange = (e) => {
    setState(prevState => ({
      ...prevState,
      labels: [e.value]
    }));
  };

  const handleSave = () => {
    const dt = state.date;
    const id = state.nextElementId;
    const newElement = {
      date: Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()),
      what: state.what,
      label: state.labels.length > 0 ? state.labels[0] : '',
      elementId: id,
    };
    
    const saveObj = isEditMode ? { ...element, ...newElement } : newElement;
    const api = new EntityAPI('wish');
    api.save(saveObj);
  };

  // Render label images
  const renderLabelImages = () => {
    return labelImages.map(label => (
      <li key={label.label}>
        <label>
          <input 
            type="radio" 
            name={`${id}Labels`}
            value={label.label}
            checked={Array.isArray(state.labels) && state.labels.includes(label.label)}
            onChange={(e) => handleLabelChange(e.target)}
          />
          <img src={label.src} alt={label.label} title={label.label} />
        </label>
      </li>
    ));
  };

  // Split labels into two rows
  const labelImgArray = renderLabelImages();
  const firstRow = labelImgArray.slice(0, 7);
  const secondRow = labelImgArray.slice(7);

  // Get formatted date for input
  const dateValue = state.date.toISOString().split('T')[0];

  return (
    <div className="page" id={id}>
      <div className="buttons">
        <Button className="form-button" onClick={handleSave}>
          <Image type="save" />
        </Button>
      </div>

      <DateField
        id={`${id}Date`}
        label="Date"
        value={dateValue}
        onChange={handleUpdateDate}
      />

      <TextField
        id={`${id}What`}
        label="What"
        value={state.what}
        validDef={state.validationState.what.validDef}
        onChange={handleWhatChange}
      />

      <div className="labels-field">
        <ul className="direction">
          {firstRow}
        </ul>
        <ul className="direction">
          {secondRow}
        </ul>
      </div>
    </div>
  );
};

export default WishListForm;