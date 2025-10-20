import Image from 'next/image';
import { useTabs } from './TabContext';

import styles from '@/styles/Tab.module.css';

interface TabProps {
  icon: string;
  filename: string;
  path: string;
}

const Tab = ({ icon, filename, path }: TabProps) => {
  const { activePath, setActive, closeTab, tabs } = useTabs();

  const isActive = activePath === path;

  return (
    <div className={`${styles.tab} ${isActive ? styles.active : ''}`}>
      <button
        className={styles.tabButton}
        onClick={() => setActive(path)}
        aria-label={`Open ${filename}`}
      >
        <Image src={icon} alt={filename} height={18} width={18} />
        <p>{filename}</p>
      </button>
      {!(tabs.length === 0 && path === '/') && path !== '/' && (
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            closeTab(path);
          }}
          aria-label={`Close ${filename}`}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Tab;
