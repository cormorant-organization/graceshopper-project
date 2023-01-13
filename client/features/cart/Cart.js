import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartSlice } from "./CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartToShow, setCartToShow] = useState([]);
  let productIds = {};
  let cartWithQuantities = [];

  useEffect(() => {
    let savedCart = JSON.parse(window.localStorage.getItem("cart"));
    if (savedCart) {
      savedCart.forEach((product) => {
        productIds[product.id] = true;
      });
      let count = 0;
      Object.keys(productIds).forEach((key) => {
        let filteredArr = JSON.stringify(
          savedCart.filter((product) => product.id === Number(key))
        );
        cartWithQuantities.push(JSON.parse(filteredArr)[0]);
        cartWithQuantities[count].quantity = JSON.parse(filteredArr).length;
        cartWithQuantities[count].price *= JSON.parse(filteredArr).length;
        count++;
      });
      setCartToShow(cartWithQuantities);
      savedCart.map((product) => {
        dispatch(CartSlice.actions.addProduct(product));
      });
    }
  }, [dispatch]);

  const clearCartHandler = () => {
    delete window.localStorage.cart;
    dispatch(CartSlice.actions.clearCart());
    //this is cheating, is there a better way?
    navigate(0);
  };

  const incrementProductHandler = (product) => {
    product.price /= product.quantity;
    delete product.quantity;
    let savedCart = JSON.parse(window.localStorage.getItem("cart"));
    savedCart.push(product);
    window.localStorage.setItem("cart", JSON.stringify(savedCart));
    dispatch(CartSlice.actions.addProduct(product));
    navigate(0);
  };

  const decrementProductHandler = (product) => {
    let savedCart = JSON.parse(window.localStorage.getItem("cart"));
    let removed = false;
    savedCart = savedCart.filter((oldProduct) => {
      if (!removed && oldProduct.id === product.id) {
        removed = true;
        return oldProduct.id !== product.id;
      } else return true;
    });
    window.localStorage.setItem("cart", JSON.stringify(savedCart));
    dispatch(CartSlice.actions.subtractProduct(product));
    navigate(0);
  };

  const removeProductHandler = (product) => {
    let savedCart = JSON.parse(window.localStorage.getItem("cart"));
    savedCart = savedCart.filter((oldProduct) => oldProduct.id !== product.id);
    window.localStorage.setItem("cart", JSON.stringify(savedCart));
    dispatch(CartSlice.actions.removeProduct(product));
    navigate(0);
  };

  /*useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);*/

  return (
    <>
      {cartToShow[0] === undefined && <p>Your cart is empty.</p>}

      {cartToShow[0] && <button onClick={clearCartHandler}>Empty Cart</button>}
      {cartToShow[0] &&
        cartToShow.map((product) => {
          return (
            <div key={product.id}>
              <img src={product.photoURL} />
              <p>{product.name}</p>
              <button
                disabled={product.quantity < 2}
                onClick={() => decrementProductHandler(product)}
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button onClick={() => incrementProductHandler(product)}>
                +
              </button>
              <p>{product.price.toFixed(2)}</p>
              <button onClick={() => removeProductHandler(product)}>
                Remove
              </button>
            </div>
          );
        })}
    </>
  );
};

export default Cart;
