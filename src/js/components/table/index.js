import React from 'react';
import './table.css';

const TABLE_CLASS = 'default-table';
const ROW_CLASS = 'default-row';
const COLUMN_CLASS = 'default-column';

function Table({ elements = [], cssClass }) {
  return (
    <div className={cssClass || TABLE_CLASS}>
      {elements.map((row, rowIdx) => (
        <div className={row.cssClass || ROW_CLASS} key={rowIdx}>
          {(row.elements || []).map((col, colIdx) => (
            <div className={col.cssClass || COLUMN_CLASS} key={colIdx}>
              {col.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;