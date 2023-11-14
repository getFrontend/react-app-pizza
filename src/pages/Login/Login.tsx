import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { PREFIX } from '../../helpers/API';
// import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
// import { userActions } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  },
  password: {
    value: string;
  }
}

export function Login() {
  // const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }

  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    // setError(null);
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    // try {
    //   const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
    //     email,
    //     password
    //   });
    //   // localStorage.setItem('jwtkey', data.access_token);
    //   dispatch(userActions.addJwt(data.access_token));
    //   navigate('/');
    // } catch (e) {
    //   if (e instanceof AxiosError) {
    //     setError(e.response?.data.message);
    //   }
    // }
  };

  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email:</label>
          <Input id="email" type="email" name="email" placeholder="Email" autoComplete="off" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль:</label>
          <Input id="password" type="password" name="password" placeholder='Password' />
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