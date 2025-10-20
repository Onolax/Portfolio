import HomeHero from '@/components/HomeHero';

export default function HomePage() {
  return <HomeHero />;
}

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
