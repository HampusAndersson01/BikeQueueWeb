import React, { useState } from 'react';

interface MinutesInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MinutesInput: React.FC<MinutesInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    if (newValue.length <= 2) {
      setInputValue(newValue);
      onChange(parseInt(newValue, 10) || 0);
    }
  };

  return (
    <div className="minutes-input" style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        style={{ paddingRight: '35px', width: '60px', textAlign: 'right', lineHeight: "1.5", fontSize: "16px", backgroundColor: 'var(--input-bg)', color: 'var(--input-color)' }} // Adjust width and padding as needed
      />
      <span style={{
        position: 'absolute',
        right: '5px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        fontSize: '16px', // Adjust font size as needed
        fontWeight: "100",
        lineHeight: "1.5",
        color: 'var(--input-color)'
      }}>
        min
      </span>
    </div>
  );
};

export default MinutesInput;
