import React from 'react';

export function Select({ children, onValueChange, defaultValue }) {
  return <select defaultValue={defaultValue} onChange={e => onValueChange(e.target.value)}>
    {children}
  </select>;
}

export function SelectTrigger({ children }) {
  return children;
}

export function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}

export function SelectContent({ children }) {
  return children;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
