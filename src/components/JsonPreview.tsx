import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { MockupPerson } from '../types';

interface JsonPreviewProps {
  data: MockupPerson[];
  theme: 'light' | 'dark';
}

const PreviewContainer = styled.div`
  background: ${({ theme }) => theme.jsonBackground};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const PreviewHeader = styled.div`
  background: ${({ theme }) => theme.headerBackground};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const CopyButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.3);
  }
`;

const HighlighterWrapper = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0;
  margin: 0;

  pre {
    margin: 0 !important;
    padding: 1rem !important;
    height: 100%;
    border-radius: 0 !important;
    font-family: 'Fira Code', monospace !important;
    font-size: 14px !important;
  }
`;

const JsonPreview: React.FC<JsonPreviewProps> = ({ data, theme }) => {
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    copy(jsonString);
    alert('JSON copiado al portapapeles');
  };

  return (
    <PreviewContainer>
      <PreviewHeader>
        <PreviewTitle>Vista Previa JSON</PreviewTitle>
        <CopyButton onClick={handleCopy}>Copiar JSON</CopyButton>
      </PreviewHeader>
      <HighlighterWrapper>
        <SyntaxHighlighter
          language="json"
          style={theme === 'dark' ? vscDarkPlus : prism}
          wrapLines={true}
          showLineNumbers={true}
        >
          {jsonString}
        </SyntaxHighlighter>
      </HighlighterWrapper>
    </PreviewContainer>
  );
};

export default JsonPreview;
