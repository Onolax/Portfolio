import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Tab = {
  path: string;
  filename: string;
  icon: string;
};

type TabContextValue = {
  tabs: Tab[];
  activePath: string;
  openTab: (path: string) => void;
  closeTab: (path: string) => void;
  setActive: (path: string) => void;
};

const TabContext = createContext<TabContextValue | undefined>(undefined);

const pathMeta: Record<string, { filename: string; icon: string }> = {
  '/': { filename: 'home.tsx', icon: '/logos/react_icon.svg' },
  '/about': { filename: 'about.html', icon: '/logos/html_icon.svg' },
  '/contact': { filename: 'contact.css', icon: '/logos/css_icon.svg' },
  '/projects': { filename: 'projects.js', icon: '/logos/js_icon.svg' },
  '/articles': { filename: 'articles.json', icon: '/logos/json_icon.svg' },
  '/github': { filename: 'github.md', icon: '/logos/markdown_icon.svg' },
};

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [tabs, setTabs] = useState<Tab[]>([
    { path: '/', filename: pathMeta['/'].filename, icon: pathMeta['/'].icon },
  ]);
  const [activePath, setActivePath] = useState<string>(router.pathname || '/');

  useEffect(() => {
    // when route changes (user navigates directly), ensure tab exists
    const p = router.pathname;
    const meta = pathMeta[p];
    if (!meta) return;
    setTabs((prev) => {
      if (prev.find((t) => t.path === p)) return prev;
      return [...prev, { path: p, filename: meta.filename, icon: meta.icon }];
    });
    setActivePath(p);
  }, [router.pathname]);

  const openTab = (path: string) => {
    const meta = pathMeta[path];
    if (!meta) {
      router.push(path);
      setActivePath(path);
      return;
    }
    setTabs((prev) => {
      if (prev.find((t) => t.path === path)) return prev;
      return [...prev, { path, filename: meta.filename, icon: meta.icon }];
    });
    setActivePath(path);
    router.push(path);
  };

  const closeTab = (path: string) => {
    if (path === '/') return; // don't close home
    setTabs((prev) => prev.filter((t) => t.path !== path));
    if (activePath === path) {
      // navigate to the last tab or home
      setTimeout(() => {
        setTabs((prev) => {
          const after = prev.filter((t) => t.path !== path);
          const last = after[after.length - 1];
          const target = last ? last.path : '/';
          setActivePath(target);
          router.push(target);
          return after;
        });
      }, 0);
    }
  };

  const setActive = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  return (
    <TabContext.Provider value={{ tabs, activePath, openTab, closeTab, setActive }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('useTabs must be used within TabProvider');
  return ctx;
};

export default TabContext;
