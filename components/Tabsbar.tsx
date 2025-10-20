import styles from '@/styles/Tabsbar.module.css';
import { useTabs } from './TabContext';
import Tab from './Tab';

const Tabsbar = () => {
  const { tabs } = useTabs();

  return (
    <div className={styles.tabs}>
      {tabs.map((t) => (
        <Tab key={t.path} icon={t.icon} filename={t.filename} path={t.path} />
      ))}
    </div>
  );
};

export default Tabsbar;
