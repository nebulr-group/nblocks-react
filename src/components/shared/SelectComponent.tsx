import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  className?: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  onChange,
  options,
  className = '',
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 sm:text-sm sm:leading-6 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}; 