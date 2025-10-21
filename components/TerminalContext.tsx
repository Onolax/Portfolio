import React, { createContext, useContext, useState } from 'react';

export type OutputLine = { text: string; type?: 'out' | 'err' | 'cmd' };

export type TerminalInstance = {
  id: string;
  name: string;
  history: OutputLine[];
};

type TerminalContextValue = {
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  instances: TerminalInstance[];
  activeId?: string;
  addInstance: () => void;
  closeInstance: (id: string) => void;
  selectInstance: (id: string) => void;
  pushOutput: (id: string | undefined, line: OutputLine) => void;
};

const MAX_INSTANCES = 3;

const TerminalContext = createContext<TerminalContextValue | undefined>(
  undefined
);

const makeInstance = (n: number): TerminalInstance => ({
  id: `${Date.now()}-${n}`,
  name: `Terminal ${n}`,
  history: [{ text: `Terminal ${n} ready.` }],
});

export const TerminalProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(true);
  // create initial instances once and use it for both state inits to avoid undefined access
  const initialInstances = [makeInstance(1)];
  const [instances, setInstances] = useState<TerminalInstance[]>(initialInstances);
  const [activeId, setActiveId] = useState<string | undefined>(initialInstances[0]?.id);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((v) => !v);

  const addInstance = () => {
    setInstances((prev) => {
      if (prev.length >= MAX_INSTANCES) return prev;
      const next = makeInstance(prev.length + 1);
      setActiveId(next.id);
      return [...prev, next];
    });
    setVisible(true);
  };

  const closeInstance = (id: string) => {
    setInstances((prev) => {
      const after = prev.filter((p) => p.id !== id);
      if (after.length === 0) {
        // no instances left: clear active and hide terminal
        setActiveId(undefined);
        setVisible(false);
      } else if (id === activeId) {
        // if the closed instance was active, move focus to the last instance
        setActiveId(after[after.length - 1].id);
      }
      return after;
    });
  };

  const selectInstance = (id: string) => {
    setActiveId(id);
    setVisible(true);
  };

  const pushOutput = (id: string | undefined, line: OutputLine) => {
    if (!id) return;
    setInstances((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, history: [...inst.history, line] } : inst))
    );
  };

  const value = { visible, show, hide, toggle, instances, activeId, addInstance, closeInstance, selectInstance, pushOutput };

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
};

export const useTerminalContext = () => {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error('useTerminalContext must be used within TerminalProvider');
  return ctx;
};

export default TerminalContext;
