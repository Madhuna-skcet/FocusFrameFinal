import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { db } from '../Firebase';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  cartCount: 0,
  user: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      const updatedCartItems = existingItem
        ? state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      updateCartInFirebase(state.user.uid, updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: updatedCartItems.reduce((total, item) => total + item.quantity, 0),
      };
    case 'REMOVE_FROM_CART':
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload.id);
      updateCartInFirebase(state.user.uid, filteredItems);
      return {
        ...state,
        cartItems: filteredItems,
        cartCount: filteredItems.reduce((total, item) => total + item.quantity, 0),
      };
    case 'DECREMENT_QUANTITY':
      const decrementedItems = state.cartItems.map(item =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const finalItems = decrementedItems.filter(item => item.quantity > 0);
      updateCartInFirebase(state.user.uid, finalItems);
      return {
        ...state,
        cartItems: finalItems,
        cartCount: finalItems.reduce((total, item) => total + item.quantity, 0),
      };
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload,
        cartCount: action.payload.reduce((total, item) => total + item.quantity, 0),
      };
    default:
      return state;
  }
};

const updateCartInFirebase = (uid, cartItems) => {
  const cartRef = ref(db, `carts/${uid}/cartItems`);
  set(cartRef, cartItems);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        const cartRef = ref(db, `carts/${user.uid}/cartItems`);
        get(cartRef).then(snapshot => {
          const cartItems = snapshot.val() || [];
          dispatch({ type: 'SET_CART', payload: cartItems });
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
