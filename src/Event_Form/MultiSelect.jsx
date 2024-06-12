import React, { useState } from 'react';

const MultiSelect = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter(option => option !== value));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const displayText = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select skills';

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '100%'
    
  };

  const dropdownHeaderStyle = {
    width: '100%',
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9'
  };

  const dropdownListStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    zIndex: '1',
    maxHeight: '150px',
    overflowY: 'auto'
  };

  const dropdownOptionStyle = {
    display: 'block',
    padding: '8px',
    cursor: 'pointer'
  };

  return (
    <div style={dropdownStyle}>
      <div style={dropdownHeaderStyle} onClick={toggleDropdown}>
        {displayText}
      </div>
      {isOpen && (
        <div style={dropdownListStyle}>
          {options.map(option => (
            <label key={option} style={dropdownOptionStyle}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;