export default function Table(props) {
  const tableClass = props.tableClass;
  const rows = props.rows;

  // Create the table element
  const tableElement = `<div class="${tableClass}">`;

  // Iterate over the rows
  for (const row of rows) {
    const rowElement = `<div class="${row.cssClass}">`;

    // Iterate over the columns
    for (const column of row.columns) {
      const columnElement = `<div class="${column.className}">${column.htmlContent}</div>`;

      // Add the column element to the row element
      rowElement += columnElement;
    }

    // Add the row element to the table element
    tableElement += rowElement;
    tableElement += '</div>';
  }

  // Add the closing table element tag
  tableElement += '</div>';

  // Return the HTML string representation of the table element
  return tableElement;
}

