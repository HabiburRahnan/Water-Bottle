import { useEffect } from "react";
import { useState } from "react";
import "./Bottle.css";
import Bottle from "../bottle/Bottle";
import { addToLS, getStoredCart, removeFromLS } from "../../../public/utilitis";
import Cart from "../Cart/Cart";
const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("Bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  useEffect(() => {
    if (bottles.length) {
      const storedCart = getStoredCart();
      // console.log(storedCart, bottles);
      const savedCart = [];
      for (const id of storedCart) {
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log("savedCard", savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddCard = (bottle) => {
    console.log(bottle);
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id);
  };
  const handleRemoveFromCart = (id) => {
    // visual cart remove
    const remainingCart = cart.filter((bottle) => bottle.id !== id);
    setCart(remainingCart);
    // removed from LS
    removeFromLS(id);
  };

  return (
    <div>
      <h2>Bottles Available: {bottles.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            handleAddCard={handleAddCard}
            bottle={bottle}></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
