import { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  isTerminalHovered: boolean;
  setTerminalHovered: (hovered: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isTerminalHovered, setTerminalHovered] = useState(false);

  return (
    <CursorContext.Provider value={{ isTerminalHovered, setTerminalHovered }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
