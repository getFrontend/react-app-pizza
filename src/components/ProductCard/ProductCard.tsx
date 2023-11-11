import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
  return (
    <Link to={'/'}>
      <div className={styles['card']}>
        <div className={styles['head']} style={{ backgroundImage: `url('${props.image}'` }}>
          <div className={styles['price']}>
            {props.price}
            <span className={styles['currency']}> $</span>
          </div>
          <button className={styles['add-to-cart']}>
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