import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

const Context = createContext();

const getLocalStorage = (session) => {
  if (typeof window !== "undefined") {
    let cartObj = localStorage.getItem(`cart-${session?.user?.email}`);
    if (!cartObj) {
      const newCartObj = {
        cart: [],
        totalPrice: 0,
        totalQuantities: 0,
      };
      localStorage.setItem(
        `cart-${session?.user?.email}`,
        JSON.stringify(newCartObj)
      );
      return newCartObj;
    }
    return JSON.parse(cartObj);
  }
};

export const CartContext = ({ children }) => {
  const { data: session } = useSession();

  const [cartObj, setCartObj] = useState({
    cart: [],
    totalPrice: 0,
    totalQuantities: 0,
  });

  useEffect(() => {
    setCartObj(getLocalStorage(session));
  }, [session]);

  const [totalPrice, setTotalPrice] = useState(cartObj?.totalPrice);

  const [totalQuantities, setTotalQuantities] = useState(
    cartObj?.setTotalQuantities
  );
  const [qty, setQty] = useState(1);

  let foundProduct;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartObj.cart.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      const updatedCartItems = cartObj.cart.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return {
            ...cartProduct,
          };
        }
      });
      const totalPrice = quantity * product.price;

      setCartObj((prevObj) => {
        return {
          ...prevObj,
          cart: updatedCartItems,
          totalQuantities: prevObj.totalQuantities + quantity,
          totalPrice: prevObj.totalPrice + totalPrice,
        };
      });
    } else {
      product.quantity = quantity;
      const totalPrice = quantity * product.price;

      // setCartObj([...cartItems, { ...product }]);
      setCartObj((prevObj) => {
        return {
          ...prevObj,
          cart: [...prevObj.cart, { ...product }],
          totalQuantities: prevObj.totalQuantities + quantity,
          totalPrice: prevObj.totalPrice + totalPrice,
        };
      });
    }
    toast.success(`Added to the cart!`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartObj.cart.find((item) => item._id === id);
    if (value === "inc") {
      const updatedCartItems = cartObj.cart.map((cartProduct) => {
        if (cartProduct._id === id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        } else {
          return {
            ...cartProduct,
          };
        }
      });
      setCartObj((prevObj) => {
        return {
          ...prevObj,
          cart: updatedCartItems,
          totalQuantities: prevObj.totalQuantities + 1,
          totalPrice: prevObj.totalPrice + foundProduct.price,
        };
      });
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updatedCartItems = cartObj.cart.map((cartProduct) => {
          if (cartProduct._id === id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          } else {
            return {
              ...cartProduct,
            };
          }
        });
        setCartObj((prevObj) => {
          return {
            ...prevObj,
            cart: updatedCartItems,
            totalQuantities: prevObj.totalQuantities - 1,
            totalPrice: prevObj.totalPrice - foundProduct.price,
          };
        });
        // setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  //remove item from the cart
  const removeCartItem = (id) => {
    foundProduct = cartObj.cart.find((item) => item._id === id);
    const updatedCartItems = cartObj.cart.filter(
      (cartProduct) => cartProduct._id !== id
    );
    setCartObj((prevObj) => {
      return {
        ...prevObj,
        cart: updatedCartItems,
        totalQuantities: prevObj.totalQuantities - foundProduct.quantity,
        totalPrice:
          prevObj.totalPrice - foundProduct.price * foundProduct.quantity,
      };
    });
  };

  const initalizeCart = () => {
    setCartObj({
      cart: [],
      totalPrice: 0,
      totalQuantities: 0,
    });
  };

  useEffect(() => {
    // const totalPrice = cartObj.totalPrice;
    localStorage.setItem(
      `cart-${session?.user?.email}`,
      JSON.stringify({
        cart: cartObj.cart,
        totalPrice: cartObj.totalPrice,
        totalQuantities: cartObj.totalQuantities,
      })
    );
    setTotalQuantities(cartObj.totalQuantities);
    setTotalPrice(cartObj.totalPrice);
  }, [cartObj]);

  return (
    <Context.Provider
      value={{
        cartObj,
        setCartObj,
        totalPrice,
        totalQuantities,
        toggleCartItemQuanitity,
        onAdd,
        removeCartItem,
        initalizeCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => useContext(Context);
