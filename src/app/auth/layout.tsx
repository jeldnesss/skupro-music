import { ReactNode } from 'react';
import styles from './layout.module.css';
import { ToastContainer } from 'react-toastify';
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </>
  );
}
