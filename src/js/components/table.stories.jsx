import React from 'react';
import Table from './table';

export default {
  title: 'Components/Table',
  component: Table,
};

const sampleElements = [
  { elements: [ { content: 'Row 1 / Col 1' }, { content: 'Row 1 / Col 2' } ] },
  { elements: [ { content: 'Row 2 / Col 1' }, { content: 'Row 2 / Col 2' } ] },
];

export const Default = () => <Table elements={sampleElements} />;

export const WithCustomClasses = () => (
  <Table elements={[
    { cssClass: 'row-special', elements: [ { cssClass: 'col-left', content: 'L' }, { cssClass: 'col-right', content: 'R' } ] }
  ]} cssClass="my-table" />
);
