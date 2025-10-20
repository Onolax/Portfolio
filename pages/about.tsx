import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Manvendra Singh</h1>
        <div className={styles.subtitle}>Software Engineer</div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              Hey! I&apos;m a software engineer from Ajmer, India. I&apos;m quite
              profecient in working with Java/Springboot and Golang.
            </p>
            <p className={styles.paragraph}>
              I&apos;m love exploring techstacks and currently interested in MLops and AI agents.
              I work with vast varities of databases and cloud platforms like AWS, Snowflake, Clickhouse etc.
              I&apos;m also a big fan of DevOps practices and CI/CD pipelines.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <p className={styles.paragraph}>
              Currently at <span className={styles.highlight}>Pickrr</span> as
              Software Engineer, working with a team of around 30 people in tech.
              I&apos;m primarily focused on building AI Agent based solutions for our business verticals.
            </p>
            <p className={styles.paragraph}>
              Currently I&apos;ve been into researching and implementing AI Agents automation for our internal
              workflows to improve efficiency and reduce manual efforts. 
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Writing</h2>
            <p className={styles.paragraph}>
              I&apos;ve had the pleasure of writing for some amazing
              publications like{' '}
              <span className={styles.highlight}>100ms Blog</span>,{' '}
              <span className={styles.highlight}>LogRocket Blog</span>,{' '}
              <span className={styles.highlight}>DEV.to</span> and more as a
              freelance technical author.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Beyond Code</h2>
            <p className={styles.paragraph}>
              Aside from programmingm, I love to play badminton and games on my PC.
              I also enjoy doing photography during my travel trips.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
