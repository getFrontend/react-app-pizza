import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`}>
      <div className={styles['card']}>
        <div className={styles['head']} style={{ backgroundImage: `url('${props.image}'` }}>
          <div className={styles['price']}>
            {props.price}
            <span className={styles['currency']}> ₴</span>
          </div>
          <button className={styles['add-to-cart']} onClick={add}>
            <img src="./img/icons/icon-cart-button.svg" alt="add to cart" />
          </button>
          <div className={styles['rating']}>
            {props.rating}
            <img src="./img/icons/icon-star.svg" alt="icon star" />
          </div>
        </div>
        <div className={styles['footer']}>
          <h3 className={styles['title']}>{props.title}</h3>
          <p className={styles['description']}>{props.description}</p>
        </div>
      </div >
    </Link>
  );
}

export default ProductCard;