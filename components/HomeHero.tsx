import Link from 'next/link';
import { VscArrowRight } from 'react-icons/vsc';

import styles from '@/styles/HomePage.module.css';

const HomeHero = () => {
  return (
    <div className={styles.heroLayout}>
      <div className={styles.container}>
        <div className={styles.codeSection}>
          <div className={styles.codeContainer}>
            <div className={styles.editorContent}>
              {/* original animated code block removed for brevity; restore if needed */}
              <div className={styles.overlayGlow}></div>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.developerName}>
            Manvendra <span className={styles.accentText}>Singh</span>
          </h1>

          <div className={styles.developerRole}>Backend Developer</div>

          <p className={styles.bio}>
            I build powerful and scalable AI Agent based solutions to automate
            business workflows and enhance operational efficiency.
          </p>

          <div className={styles.actionLinks}>
            <Link href="/projects" className={styles.primaryLink}>
              View Projects <VscArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
