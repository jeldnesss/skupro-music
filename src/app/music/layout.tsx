import { ReactNode } from 'react';
import styles from './layout.module.css';
import Nav from '@/components/Nav/Nav';
import MainSidebar from '@/components/MainSidebar/MainSidebar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Nav />
          {children}
          <MainSidebar />
          <Bar />
          <footer className="footer"></footer>
        </main>
      </div>
    </div>
  );
}
