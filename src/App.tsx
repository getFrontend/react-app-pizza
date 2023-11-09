import { MouseEvent, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
import { Menu } from './pages/Menu/Menu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/cart',
    element: <Cart />
  }
]);

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
  };

  return (
    <>
      <Button onClick={addCounter}>Click</Button>
      <Button appearence='big' onClick={addCounter}>Click</Button>
      <Input placeholder='Type the text please' />
      <div>
        <a href="/">Menu</a>
        <a href="/cart">Cart</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
