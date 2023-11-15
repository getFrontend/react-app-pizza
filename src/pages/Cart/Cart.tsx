import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_PRICE = 99;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const total =
		items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		}).reduce((acc, i) => acc += i, 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(item => getItem(item.id)));
		setCartProducts(res);
	};

	const checkout = async () => {
		await axios.post(`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		dispatch(cartActions.clean());
		navigate('/order');
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Headling className={styles['headling']}>Корзина</Headling>
			{items.map(item => {
				const product = cartProducts.find(p => p.id === item.id);
				if (!product) {
					return;
				}
				return <CartItem key={product.id} count={item.count} {...product} />;
			})}
			<div className={styles['line']}>
				<div className={styles['text']}>Сумма</div>
				<div className={styles['price']}>{total}&nbsp;<span>₴</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>{total > 1000 ? 0 : DELIVERY_PRICE}&nbsp;<span>₴</span></div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Итого с учётом доставки</div>
				<div className={styles['price']}>{total + DELIVERY_PRICE}&nbsp;<span>₴</span></div>
			</div>
			<div className={styles['checkout']}>
				<Button appearence='big' onClick={checkout}>Оформить</Button>
			</div>
		</>
	);
}