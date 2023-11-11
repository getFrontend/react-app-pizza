import { useState, useEffect } from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenu = async () => {
		try {
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch (error) {
			console.error(error);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Menu</Headling>
				<Search placeholder="Enter your favourite meal" />
			</div>
			<div>
				{products.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						title={product.name}
						description={product.ingredients.join(', ')}
						rating={product.rating}
						price={product.price}
						image={product.image}
					/>
				))}
			</div>
		</>
	);
}