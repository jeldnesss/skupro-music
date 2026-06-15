'use client';

import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { signUpUser } from '@/services/auth/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errorMes, setErrorMes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setErrorMes('');
    setIsLoading(true);

    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      setErrorMes('Заполните все поля');
      setIsLoading(false);
      return;
    }

    if (password !== repeatPassword) {
      setErrorMes('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    signUpUser({
      email,
      password,
      username,
    })
      .then((res) => {
        console.log(res.data);
        alert('Пользователь успешно зарегистрирован');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMes(error.response.data.message);
          } else if (error.request) {
            setErrorMes('Ошибка интернета');
          } else {
            setErrorMes('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        type="email"
        placeholder="Почта"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <input
        className={styles.modal__input}
        type="text"
        placeholder="Имя пользователя"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      <input
        className={styles.modal__input}
        type="password"
        placeholder="Пароль"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <input
        className={styles.modal__input}
        type="password"
        placeholder="Повторите пароль"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRepeatPassword(e.target.value)
        }
      />

      <div className={styles.errorContainer}>{errorMes}</div>

      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </>
  );
}
