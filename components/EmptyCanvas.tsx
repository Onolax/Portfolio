import styles from '@/styles/EmptyCanvas.module.css';
import { useTabs } from './TabContext';

const EmptyCanvas = () => {
  const { openTab } = useTabs();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>All files closed</h2>
        <p>Open a file from the explorer or use the quick actions below.</p>

        <div className={styles.actions}>
          <button onClick={() => openTab('/projects')} className={styles.primary}>
            Open Projects
          </button>
          <button onClick={() => openTab('/articles')}>Open Articles</button>
          <button onClick={() => openTab('/contact')}>Contact</button>
        </div>

        <p className={styles.hint}>Tip: Use the left explorer to open files.</p>
      </div>
    </div>
  );
};

export default EmptyCanvas;
