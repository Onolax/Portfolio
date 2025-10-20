import Head from 'next/head';

interface CustomHeadProps {
  title: string;
}

const CustomHead = ({ title }: CustomHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Manvendra Singh is a Backend Developer focusing on scalable AI agents, resilient backend systems, and DevOps-driven production deployments."
      />
      <meta
        name="keywords"
        content="Manvendra Singh, backend developer, AI agents, DevOps, node.js, typescript, backend engineer, Onolax, portfolio"
      />
      <meta property="og:title" content="Manvendra Singh's Portfolio" />
      <meta
        property="og:description"
        content="Backend engineer building scalable AI agent solutions and production-ready backend systems."
      />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://vscode-portfolio.vercel.app" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Manvendra Singh',
};
