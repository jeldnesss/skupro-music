'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import { useContext, useEffect, useState } from 'react';
import { getUniqueValuesByKey } from '@/utils/helper';
type UserType = {
  username: string;
  email: string;
  _id: number;
};
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            {!user && !loading && (
              <li className={styles.menu__item}>
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
