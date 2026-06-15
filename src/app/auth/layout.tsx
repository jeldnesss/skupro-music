import { ReactNode } from 'react';
import styles from './layout.module.css';

interface AutoLayotProps {
  children: ReactNode;
}

export default function AuthLayot({ children }: AutoLayotProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>{children}</form>
          </div>
        </div>
      </div>
    </>
  );
}
