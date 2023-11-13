import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className={styles['login']} onSubmit={submit}>
      <Headling>Вход</Headling>
      <form className={styles['form']}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email:</label>
          <Input id="email" type="email" placeholder="Email" autoComplete="off" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль:</label>
          <Input id="password" type="password" placeholder='Password' />
        </div>
        <Button appearence="big">Войти</Button>
      </form>
      <div className={styles['links']}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}