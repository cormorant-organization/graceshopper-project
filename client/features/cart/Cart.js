import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartSlice } from "./CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
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
        count++;
      });
      setCartToShow(cartWithQuantities);
      savedCart.map((product) => {
        dispatch(CartSlice.actions.addProduct(product));
      });
    }
  }, [dispatch]);

  /*useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);*/

  return (
    <div>
      {cartToShow[0] === undefined ? (
        <p>Your cart is empty.</p>
      ) : (
        cartToShow.map((product) => {
          return (
            <p key={product.id}>
              {product.name} {product.quantity}
            </p>
          );
        })
      )}
    </div>
  );
};

export default Cart;
