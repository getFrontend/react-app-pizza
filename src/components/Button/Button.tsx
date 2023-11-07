import './Button.module.css';
import { ButtonProps } from './Button.props';

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className='button accent' {...props}>{children}</button>
  );
}

export default Button;