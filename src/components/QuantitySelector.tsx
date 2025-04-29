import React from 'react';
import styled from 'styled-components';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
}

const SelectorContainer = styled.div`
  background: ${({ theme }) => theme.menuBackground};
  border-radius: 8px;
  padding: 1.2rem;
  margin-top: 1rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.border};
  border-radius: 5px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
  }
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
`;

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 1000) {
      onChange(newValue);
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <SelectorContainer>
      <Title>Cantidad de Elementos</Title>
      <InputContainer>
        <Label htmlFor="quantity">Elementos (1-1000):</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max="1000"
          value={quantity}
          onChange={handleInputChange}
        />
      </InputContainer>
      <RangeContainer>
        <RangeInput
          type="range"
          min="1"
          max="1000"
          value={quantity}
          onChange={handleRangeChange}
        />
        <RangeLabels>
          <span>1</span>
          <span>500</span>
          <span>1000</span>
        </RangeLabels>
      </RangeContainer>
    </SelectorContainer>
  );
};

export default QuantitySelector;
