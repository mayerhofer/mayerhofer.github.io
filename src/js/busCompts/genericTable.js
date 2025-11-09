import React, { useState, useEffect } from "react";
import EntityAPI from "../servers/entity";
import Button from "../html/button";
import Image from "../html/image";

export default function GenericTable({
  formatter, filter, entity, handleSelectFromProp, id, buildEditComponent, idEditComponent, header
}) {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(15);
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const increment = 15;

  useEffect(() => {
    const api = new EntityAPI(entity);
    api.get(filter).then(data => {
      if (Array.isArray(data) && data.length > 0 && typeof data[0].date === 'number') {
        data.sort((a,b) => ((new Date(b.date)).getTime() - (new Date(a.date)).getTime()));
      }
      setData(data);
    });
  }, [entity, filter]);

  const handleDelete = (element) => {
    if (window.confirm('Delete?')) {
      const api = new EntityAPI(entity);
      api.delete(element).then(() => {
        if (entity === 'cashflow') {
          const lApi = new EntityAPI('liability');
          lApi.get().then(res => {
            const found = res.find(l => l.cashflowId === element.elementId);
            if (found) {
              lApi.delete(found);
            }
          });
        }
        setData(prev => prev.filter(ele => ele !== element));
      });
    }
  };

  const handleEdit = (element) => {
    setShowEdit(true);
    setEditing(element);
  };

  const handleSelect = (element) => {
    if (typeof handleSelectFromProp === 'function') {
      handleSelectFromProp(element, handleRemoveRow);
    }
  };

  const handleBack = () => {
    setStart(prev => prev - increment);
    setEnd(prev => prev - increment);
  };

  const handleForw = () => {
    setStart(prev => prev + increment);
    setEnd(prev => prev + increment);
  };

  const handleSaveOne = (one) => {
    setData(prev => {
      const elements = [...prev];
      const found = elements.find(o => o._id === one._id);
      if (found) {
        elements[elements.indexOf(found)] = one;
      } else {
        elements.unshift(one);
        elements.sort((a,b) => ((new Date(b.date)).getTime() - (new Date(a.date)).getTime()));
      }
      return elements;
    });
  };

  const handleClose = () => {
    setShowEdit(false);
    setEditing(null);
  };

  const handleRemoveRow = (elementId) => {
    setData(prev => prev.filter(ele => ele.elementId !== elementId));
  };

  const rowToHtml = (row) => {
    const fields = Object.keys(formatter).map(key => formatter[key](row));
    let actionButtons = null;
    if (typeof buildEditComponent === 'function') {
      actionButtons = (
        <div className="actions-wrapper" key={`${row.elementId}-actions`}>
          <Button className="act-btn" onClick={() => handleSelect(row)}>
            <Image name='select' />
          </Button>
          <Button className="act-btn" onClick={() => handleEdit(row)}>
            <Image name='edit' />
          </Button>
          <Button className="act-btn" onClick={() => handleDelete(row)}>
            <Image name='delete' />
          </Button>
        </div>
      );
    }
    return (
      <div key={`row-${row.elementId}`} className="table__row">
        {fields}
        {actionButtons}
      </div>
    );
  };

  if (showEdit) {
    const handleSave = handleSaveOne;
    const EditComponent = buildEditComponent;
    return (
      <div className="table__wrapper" id={id}>
        <div className="div--scrollable" id={id + 'content'}>
          <EditComponent
            id={idEditComponent}
            handleSaved={handleSave}
            handleClose={handleClose}
            data={data}
            element={editing}
          />
        </div>
      </div>
    );
  } else {
    const rows = data.slice(start, end).map(rowToHtml);
    const label = <div className="table__header-label">{(new Date()).toISOString().substring(0, 10)}</div>;
    const count = <div className="table__header-label">{data.length + ': ' + (start + 1) + '-' + (end > data.length ? data.length : end)}</div>;
    const backwards = (
      <Button className="table__header-add" id={id + 'Backwards'} onClick={handleBack} disabled={start === 0}>
        <span>&lt;</span>
      </Button>
    );
    const forwards = (
      <Button className="table__header-add" id={id + 'Forwards'} onClick={handleForw} disabled={start + 16 >= data.length}>
        <span>&gt;</span>
      </Button>
    );
    let button = null;
    if (typeof buildEditComponent === 'function') {
      button = (
        <Button className="table__header-add" id={id + 'AddNew' + entity} onClick={() => handleEdit()}>
          <span>+</span>
        </Button>
      );
    }
    const localHeader = (
      <div className="table__header">
        {label}
        {count}
        {backwards}
        {forwards}
        {button}
      </div>
    );
    let section = null;
    if (data && typeof header === 'function') {
      const HeaderComponent = header;
      section = <HeaderComponent id={id + 'Header'} data={data} />;
    }
    return (
      <div className="div--scrollable" id={id}>
        {section}
        {localHeader}
        <div className="table__wrapper" id={id + 'content'}>
          {rows}
        </div>
      </div>
    );
  }
}
