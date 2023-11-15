import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Order.module.css';
export function Order() {
  const navigate = useNavigate();

  return (
    <div className={styles['success']}>
      <img src="/img/pizza.png" alt="Изображение пиццы" />
      <div className={styles['text']}>Поздравлям, ваш заказ оформлен!</div>
      <Button appearence="big" onClick={() => navigate('/')}>Новый заказ</Button>
    </div>
  );
}