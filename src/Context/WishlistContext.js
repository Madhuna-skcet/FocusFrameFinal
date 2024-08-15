import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { db } from '../Firebase';

const WishlistContext = createContext();

const initialState = {
  wishlistItems: [],
  wishlistCount: 0,
  user: null,
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const updatedWishlist = [...state.wishlistItems, action.payload];
      updateWishlistInFirebase(state.user.uid, updatedWishlist);
      return {
        ...state,
        wishlistItems: updatedWishlist,
        wishlistCount: updatedWishlist.length,
      };
    case 'REMOVE_FROM_WISHLIST':
      const filteredWishlist = state.wishlistItems.filter(item => item.id !== action.payload.id);
      updateWishlistInFirebase(state.user.uid, filteredWishlist);
      return {
        ...state,
        wishlistItems: filteredWishlist,
        wishlistCount: filteredWishlist.length,
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlistItems: action.payload,
        wishlistCount: action.payload.length,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const updateWishlistInFirebase = (uid, wishlistItems) => {
  const wishlistRef = ref(db, `wishlists/${uid}/wishlistItems`);
  set(wishlistRef, wishlistItems);
};

const fetchWishlistFromFirebase = async (uid) => {
  const wishlistRef = ref(db, `wishlists/${uid}/wishlistItems`);
  const snapshot = await get(wishlistRef);
  return snapshot.val() || [];
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        const wishlistItems = await fetchWishlistFromFirebase(user.uid);
        dispatch({ type: 'SET_WISHLIST', payload: wishlistItems });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
