import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'email',
    link: 'manvendras2103@gmail.com',
    href: 'mailto:manvendras2103@gmail.com',
  },
  {
    social: 'github',
    link: 'Onolax',
    href: 'https://github.com/Onolax',
  },
  {
    social: 'linkedin',
    link: 'manvendra-singh19',
    href: 'https://www.linkedin.com/in/manvendra-singh19/',
  },
  {
    social: 'twitter',
    link: 'manvendra',
    href: 'https://www.twitter.com/manvendra',
  },
  {
    social: 'telegram',
    link: 'manvendra',
    href: 'https://t.me/manvendra',
  },
  {
    social: 'peerlist',
    link: 'manvendra-singh',
    href: 'https://peerlist.io/manvendra-singh',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
