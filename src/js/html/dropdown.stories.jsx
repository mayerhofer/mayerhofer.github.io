import React, { useState } from 'react';
import Dropdown from './dropdown';

export default {
  title: 'HTML/Dropdown',
  component: Dropdown,
  argTypes: {
    data: { control: 'array' },
    selected: { control: 'text' }
  }
};

const Wrapper = ({ children }) => (
  <div style={{ padding: '20px', maxWidth: '300px' }}>
    {children}
  </div>
);
const Container = (args) => {
  const [value, setValue] = useState(args.selected || '');
  return (
    <div>
      <Dropdown {...args} selected={value} onChange={(v) => setValue(v)} />
      <div style={{marginTop: 8}}>Selected: {value}</div>
    </div>
  );
};

export const Default = (args) => {
  return (<Wrapper><Container {...args} /></Wrapper>);
};
Default.args = {
  id: 'story-combobox',
  options: ['Option A', 'Option B', 'Option C'],
  selected: 'Option A',
};

export const DefaultWithEmpty = (args) => {
  return (<Wrapper><Container {...args} /></Wrapper>);
};
DefaultWithEmpty.args = {
  id: 'story-combobox',
  options: ['Option A', 'Option B', 'Option C'],
  includeEmpty: true,
  selected: '',
  emptyLabel: "Select...",
  placeholder: "Select ...",
};


const Color = ({ color, label }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 16, height: 16, background: color, marginRight: 8, borderRadius: 2 }} />
        <span>{label}</span>
    </div>
);

const componentOptions = [
    <Color key="red" color="#e74c3c" label="Red" />,
    <Color key="green" color="#2ecc71" label="Green" />,
    <Color key="blue" color="#3498db" label="Blue" />
];

export const DropdownWithComponents = (args) => {
  return (<Wrapper><Container {...args} /></Wrapper>);
};
DropdownWithComponents.args = {
  id: 'story-combobox',
  options: componentOptions.map((comp) => ({ value: comp.key, label: comp })),
  includeEmpty: true,
  selected: '',
  emptyLabel: "Select...",
  placeholder: "Select ...",
};
