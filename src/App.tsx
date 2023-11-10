import { MouseEvent, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { RouterProvider, createBrowserRouter, Link } from 'react-router-dom';

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
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
