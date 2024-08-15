// WishlistContext.js
import React, { createContext, useReducer, useContext } from 'react';

const WishlistContext = createContext();

const initialState = {
  wishlistItems: [],
  wishlistCount: 0,
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
        wishlistCount: state.wishlistCount + 1,
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload.id),
        wishlistCount: state.wishlistCount - 1,
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
