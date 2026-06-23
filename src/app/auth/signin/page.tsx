'use client';
import { authUser } from '@/services/auth/auth';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { saveTokens } from '@/utils/token';
import { BASE_URL } from '@/services/constants';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMes, setErrorMes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMes('');

      const res = await authUser({ email, password });

      console.log(res);

      saveTokens(res.access, res.refresh);

      const userRes = await fetch(`${BASE_URL}/user/login/`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'content-type': 'application/json',
        },
      });

      const userData = await userRes.json();

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('access', res.access);
      localStorage.setItem('refresh', res.refresh);

      router.push('/music/main');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMes}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
