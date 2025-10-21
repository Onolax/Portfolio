import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Terminal.module.css';
import { useTabs } from './TabContext';
import explorerItems, { ExplorerItem } from './_explorerItems';
import { useTerminalContext } from './TerminalContext';
import { VscChevronDown } from 'react-icons/vsc';

const Terminal = () => {
  const { visible, hide, addInstance, instances, activeId, selectInstance, closeInstance, pushOutput, show } = useTerminalContext();
  const [input, setInput] = useState('');
  const { openTab } = useTabs();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const [height, setHeight] = useState<number>(240);

  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible, activeId]);

  const runCommand = (raw: string) => {
    const parts = raw.trim().split(/\s+/);
    const cmd = parts[0];
    if (!activeId) return;
    pushOutput(activeId, { text: `> ${raw}`, type: 'cmd' });

    if (cmd === 'help' || cmd === '') {
      pushOutput(activeId, { text: 'Available commands: ls, code <filename>, help' });
      return;
    }

    if (cmd === 'ls') {
      explorerItems.forEach((item: ExplorerItem) => pushOutput(activeId, { text: item.name }));
      return;
    }

    if (cmd === 'code') {
      const filename = parts.slice(1).join(' ');
      if (!filename) {
        pushOutput(activeId, { text: 'Usage: code <filename>', type: 'err' });
        return;
      }
      const found = explorerItems.find((it: ExplorerItem) => it.name === filename);
      if (!found) {
        pushOutput(activeId, { text: `File not found: ${filename}`, type: 'err' });
        return;
      }
      // open the corresponding path
      openTab(found.path);
      pushOutput(activeId, { text: `Opened ${filename}` });
      return;
    }

    pushOutput(activeId, { text: `Unknown command: ${cmd}`, type: 'err' });
  };

  const activeInstance = instances.find((i) => i.id === activeId);

  // auto-scroll when history changes
  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [activeInstance?.history.length, visible, height]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      const dy = startYRef.current - e.clientY; // move up increases height
      const newH = Math.max(80, startHeightRef.current + dy);
      setHeight(newH);
    }

    function onMouseUp() {
      draggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // focus input when terminal is shown or active instance changes
  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible, activeId]);

  return (
      <div className={`${styles.terminal} ${visible ? styles.open : styles.closed}`} style={{ height }}>
      <div className={styles.header}>
        {/* draggable strip — only this small area shows resize cursor and handles drag */}
        <div
          className={styles.resizer}
          onMouseDown={(e) => {
            draggingRef.current = true;
            startYRef.current = e.clientY;
            startHeightRef.current = height;
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
          }}
          aria-hidden
        />
        <div className={styles.title} onClick={() => (visible ? hide() : show())}>
          <VscChevronDown style={{ transform: visible ? 'rotate(0deg)' : 'rotate(-90deg)' }} /> TERMINAL
        </div>
        <div className={styles.actions}>
          <div className={styles.instances}>
            {instances.map((inst) => (
              <button
                key={inst.id}
                className={styles.instanceTab}
                onClick={() => selectInstance(inst.id)}
                aria-pressed={inst.id === activeId}
              >
                {inst.name}
                <span
                  className={styles.instanceClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeInstance(inst.id);
                  }}
                >
                  ×
                </span>
              </button>
            ))}
            <button
              className={styles.addInstance}
              onClick={addInstance}
              disabled={instances.length >= 3}
              aria-label="Add terminal instance"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div ref={outputRef} className={styles.output} style={{ maxHeight: Math.max(80, height - 120) }}>
        {activeInstance ? (
          activeInstance.history.map((line, i) => (
            <div key={i} className={styles.line} data-type={line.type || 'out'}>
              {line.text}
            </div>
          ))
        ) : (
          <div className={styles.line}>No terminal instances. Click + to add one.</div>
        )}
      </div>

      <div className={styles.inputRow}>
        <span className={styles.prompt}>$</span>
        <div className={styles.inputWrapper}>
          <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              runCommand(input);
              setInput('');
              // ensure scroll after command resolves
              setTimeout(() => {
                if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
              }, 50);
            }
            if (e.key === 'Escape') {
              setInput('');
            }
          }}
          className={styles.input}
          aria-label="Terminal input"
        />
          {/* native input caret is used; no mirror or custom block cursor needed */}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
