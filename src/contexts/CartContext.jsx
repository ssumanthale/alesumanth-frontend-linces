import { createContext, useState, useContext, useEffect } from "react";
import { cartAPI, ordersAPI } from "../services/api";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Normalize cart item
  const formatCartItem = (item) => ({
    cartItemId: item.id,
    quantity: item.quantity,
    ...item.product,
  });

  // Fetch cart
  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await cartAPI.getCart();
      const items = response.data.data.items || [];

      setCartItems(items.map(formatCartItem));
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add item
  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await cartAPI.add({
        productId: product.id,
        quantity,
      });

      const newItem = formatCartItem(response.data.data);

      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);

        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: newItem.quantity }
              : i
          );
        }

        return [...prev, newItem];
      });
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      const {data} = await cartAPI.update({
        cartItemId,
        quantity,
      });

      const updated = data.data;
      console.log(updated);
      console.log(cartItems);
      console.log(cartItemId);
      
      

      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: updated.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  // Remove item
  const removeFromCart = async (cartItemId) => {
    try {
      await cartAPI.remove(cartItemId);

      setCartItems((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );
    } catch (error) {
      console.error("Remove cart item error:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Item count
  const getCartItemsCount = () => {
    return cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
  };

  // Checkout
  const checkout = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getCartTotal(),
      };

      const response = await ordersAPI.create(orderData);

      const orderId = response.data.data.id;

      clearCart();

      return orderId;
    } catch (error) {
      console.error("Checkout error:", error);
      throw error;
    }
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartTotal,
    getCartItemsCount,
    checkout,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};