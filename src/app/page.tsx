import Image from 'next/image';
import './page.css';
import classnames from 'classnames';
import styles from './page.module.css';
import Link from 'next/link';
import Bar from '@/components/Bar/Bar';
import MainSidebar from '@/components/MainSidebar/MainSidebar';
import Centerclock from '@/components/Centerblock/Centerblock';
import Nav from '@/components/Nav/Nav';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <Centerclock />
          <MainSidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
