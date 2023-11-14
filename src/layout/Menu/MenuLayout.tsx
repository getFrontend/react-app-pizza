import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		// localStorage.removeItem('jwtkey');
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/img/avatar.png" alt="user avatar" />
				{/* <div className={styles['name']}>Ivan Kovbasa</div> */}
				<div className={styles['name']}>{profile?.name}</div>
				{/* <div className={styles['email']}>react-pizza@ukraine.com.ua</div> */}
				<div className={styles['email']}>{profile?.email}</div>
			</div>
			<div className={styles['menu']}>
				<NavLink to='/' className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img src="/img/icons/icon-menu.svg" alt="icon menu" />Меню</NavLink>
				<NavLink to='/cart' className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img src="/img/icons/icon-cart.svg" alt="icon cart" />Заказ</NavLink>
			</div>
			<Button className={styles['exit']} onClick={logout}>
				<img src="/img/icons/icon-exit.svg" alt="icon exit" />
				Выйти
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}