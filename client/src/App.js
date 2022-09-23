import React, { useEffect, useState } from "react"
import {commerce}  from "./lib/commerce"
import { Routes, Route } from "react-router-dom"
import MainPage from './views/MainPage';
import { NavBar, ShopAllProducts, Cart, OneBrand, OneProduct, Checkout } from './components';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})
    const [categories, setCategories] = useState([])
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const fetchProducts = async () => {
      const { data: products } = await commerce.products.list({ limit: 100 })
      setProducts(products)
  }

  const fetchCategories = async () => {
    const { data: categories } = await commerce.categories.list({})
    setCategories(categories)
  }

    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(await commerce.cart.retrieve())
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    console.log(quantity)
    const { cart } = await commerce.cart.update(productId, {quantity});
    setCart(await commerce.cart.retrieve())
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(await commerce.cart.retrieve());
  }

  const handleEmptyCart = async() => {
    const { cart } = await commerce.cart.empty();
    setCart(await commerce.cart.retrieve())
  } 

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

      setOrder(incomingOrder)
      refreshCart();
    }
    catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchCategories();
  }, [])

  return (
    <div className="App">
      <NavBar totalItems={cart.total_items} categories={categories}/>
      <Routes>
        <Route path="/" element={<MainPage cart={cart} products={products}/>} />
        <Route path="/shop" element={<ShopAllProducts onAddToCart={handleAddToCart} products={products} cart={cart}/>} />
        <Route path="/cart" element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} 
        handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>} />
        <Route path="/shop/:slug" element={<OneBrand onAddToCart={handleAddToCart}/>}/>
        <Route path="/shop/shoe/:id" element={<OneProduct onHandleUpdateCartQty={handleUpdateCartQty} cart={cart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>} />
      </Routes>
    </div>
  );
}

export default App;
