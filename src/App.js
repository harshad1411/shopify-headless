import Header from './components/Header';
import Index from './routes/index';
import Collections from './routes/collections';
import Contact from './routes/contact';
import Product from './routes/product';
import Collection from './routes/collection';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {CART_CREATE_MUTATION, GET_CART_DATA} from './lib/graphql';
import { useState, useEffect } from 'react';
import { shopifyFetch } from './lib/utils';
import SideCart from './components/SideCart';
// import Product from './Product';
function App() {
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  
  useEffect(() => {
      setCartData();
  }, [cart?.totalQuantity]);
  

  const initCart = async (id) =>{
    const variables = {id: id};
    const response = await shopifyFetch(GET_CART_DATA, variables);
    const data = await response.json();
    console.log("cart data  ",data);
    setCart(data.data.cart);
  }

  const setCartData = async () => {
    const locaCartId = localStorage.getItem('cartId');
    if (locaCartId) {
        await initCart(locaCartId);
    } else {
      const data = await createCart();
      const newCartId = data.data.cartCreate.cart.id;
      localStorage.setItem('cartId', newCartId);
      await initCart(newCartId);
    }
    return cart;
  }


  const createCart = async () => {
    try {
      const response = await shopifyFetch(CART_CREATE_MUTATION, {input: {}});
      const data = await response.json();
      return data;
    }catch(error){
      console.error('Error:', error);
    }
  }

  return (
    <BrowserRouter>
      <Header cartCount={cart?.totalQuantity} setShowCart={setShowCart}/>
      {showCart && <SideCart renderCartData={initCart} cart={cart} setShowCart={setShowCart} />}
      <div className="">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:handle" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:handle" element={<Product setShowCart={setShowCart} renderCartData={initCart} cartId={cart?.id} />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
  // const [categories, setCategories] = useState([]);
  // const [cart, setCart] = useState([]);
  // const [showCart, setShowCart] = useState(false);
  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  //   setShowCart(true);
  // };
  // useEffect(() => {
  //   getCategories();
  // }, []);


  // const getCategories = async () => {
  //   try {
  //     const response = await fetch('https://api.escuelajs.co/api/v1/products');
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const removeFromCart = (id) => {
  //   setCart(cart.filter((item) => item.id !== id));
  // };

  // console.log(cart);
  // return (
  //   <div className="App">
  //     <Categories  addToCart={addToCart} categories={categories} />
  //     {showCart && <SideCart removeFromCart={removeFromCart} setShowCart={setShowCart} cart={cart} />}
  //   </div>

  // );
}

export default App;
