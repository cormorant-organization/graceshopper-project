import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  CartSlice,
  checkout,
  clearUserCart,
  decrementProduct,
  fetchCart,
  removeProductFromCart,
} from "./CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartToShow, setCartToShow] = useState([]);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  let stateCart = useSelector((state) => state.cart);
  let productIds = {};
  let cartWithQuantities = [];

  const updateCartView = (savedCart) => {
    if (savedCart) {
      if (savedCart.length) {
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
      } else setCartToShow([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart(userId));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      updateCartView(savedCart);
      if (savedCart) {
        savedCart.map((product) => {
          dispatch(CartSlice.actions.addProduct(product));
        });
      }
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      updateCartView(stateCart);
    }
  }, [stateCart]);

  const clearCartHandler = () => {
    if (isLoggedIn) {
      dispatch(clearUserCart(userId));
      dispatch(fetchCart(userId));
    } else {
      delete window.localStorage.cart;
      dispatch(CartSlice.actions.clearCart());
    }
    if (!isLoggedIn) navigate(0);
  };

  const incrementProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart({ userId: userId, puppyId: product.id }));
    } else {
      product.price /= product.quantity;
      delete product.quantity;
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      savedCart.push(product);
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
      dispatch(CartSlice.actions.addProduct(product));
    }
    if (!isLoggedIn) navigate(0);
  };

  const decrementProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(decrementProduct({ userId: userId, puppyId: product.id }));
      dispatch(fetchCart(userId));
    } else {
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
    }
    if (!isLoggedIn) navigate(0);
  };

  const removeProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(removeProductFromCart({ userId: userId, puppyId: product.id }));
      dispatch(fetchCart(userId));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      savedCart = savedCart.filter(
        (oldProduct) => oldProduct.id !== product.id
      );
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
      dispatch(CartSlice.actions.removeProduct(product));
    }
    if (!isLoggedIn) navigate(0);
  };

  const checkoutHandler = async () => {
    if (isLoggedIn) {
      await dispatch(checkout(userId));
    } else {
      delete window.localStorage.cart;
      dispatch(CartSlice.actions.clearCart());
    }
    navigate("/checkout");
  };

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
      {cartToShow[0] && (
        <h5>
          Total Price:{" "}
          {cartToShow
            .reduce((accum, product) => accum + product.price, 0)
            .toFixed(2)}
        </h5>
      )}
      {cartToShow[0] && <button onClick={checkoutHandler}>Checkout</button>}
    </>
  );
};

export default Cart;
