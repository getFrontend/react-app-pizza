import { NavLink, Outlet } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {

	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="./img/avatar.png" alt="user avatar" />
				<div className={styles['name']}>Ivan Kovbasa</div>
				<div className={styles['email']}>react-pizza@ukraine.com.ua</div>
			</div>
			<div className={styles['menu']}>
				<NavLink to='/' className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img src="./img/icons/icon-menu.svg" alt="icon menu" />Menu</NavLink>
				<NavLink to='/cart' className={({ isActive }) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img src="./img/icons/icon-cart.svg" alt="icon cart" />Cart</NavLink>
			</div>
			<Button className={styles['exit']}>
				<img src="./img/icons/icon-exit.svg" alt="icon exit" />
				Exit
			</Button>
		</div>
		<div className={styles['content']}>
			<Outlet />
		</div>
	</div>;
}