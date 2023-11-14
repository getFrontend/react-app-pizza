import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
  };

  const remove = () => {
  };


  return (
    <div className={styles['item']}>
      <div className={styles['image']} style={{ backgroundImage: `url('${props.image}')` }}></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['currency']}>{props.price}&nbsp;₴</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['button']} onClick={descrease}>
          <img src="/img/icons/icon-cart-button.svg" alt="Удалить из корзины" />
        </button>
        <div>{props.count}</div>
        <button className={styles['button']} onClick={increase}>
          <img src="/img/icons/icon-cart-button.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src="/img/icons/icon-cart-button.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;