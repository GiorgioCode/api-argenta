import React from 'react';
import styled from 'styled-components';
import { ThemeType } from '../theme/theme';

interface ThemeToggleProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

const ToggleContainer = styled.button<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.toggleBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;

  &:focus {
    outline: none;
  }
`;

const ToggleButton = styled.span<{ 
  theme: ThemeType; 
  islight: string;
}>`
  background: ${({ theme }) => theme.toggleButton};
  border-radius: 50%;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  transition: all 0.3s linear;
  width: 1rem;
  transform: ${({ islight }) =>
    islight === 'true' ? 'translateX(0)' : 'translateX(2rem)'};
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      <IconContainer>
        <span role="img" aria-label="sol">☀️</span>
        <span role="img" aria-label="luna">🌙</span>
      </IconContainer>
      <ToggleButton islight={String(currentTheme === 'light')} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
