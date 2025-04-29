import React from 'react';
import styled from 'styled-components';
import { FieldType } from '../types';

interface FieldSelectorProps {
  fields: FieldType[];
  onToggleField: (id: string) => void;
}

const SelectorContainer = styled.div`
  background: ${({ theme }) => theme.menuBackground};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const FieldsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${props => (props.checked ? props.theme.primary : 'transparent')};
  border: 2px solid ${props => (props.checked ? props.theme.primary : props.theme.border)};
  border-radius: 4px;
  transition: all 150ms;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: ${props => (props.checked ? 'block' : 'none')};
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const FieldSelector: React.FC<FieldSelectorProps> = ({ fields, onToggleField }) => {
  return (
    <SelectorContainer>
      <Title>Seleccionar Campos</Title>
      <FieldsList>
        {fields.map((field) => (
          <FieldItem key={field.id}>
            <CheckboxContainer onClick={() => onToggleField(field.id)}>
              <HiddenCheckbox 
                checked={field.selected}
                onChange={() => {}}
              />
              <StyledCheckbox checked={field.selected} />
              <Label>{field.label}</Label>
            </CheckboxContainer>
          </FieldItem>
        ))}
      </FieldsList>
    </SelectorContainer>
  );
};

export default FieldSelector;
