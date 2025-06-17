import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { clearCart, updateQuantity, removeFromCart } from '../features/productsSlice.ts';
import { toastSuccessNotify } from '../helper/ToastNotify.tsx';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector(state => state.products);

  const handleClearCart = () => {
    dispatch(clearCart());
    toastSuccessNotify('Cart cleared successfully!');
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        dispatch(removeFromCart(productId));
        toastSuccessNotify('Product removed from cart');
      } else {
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toastSuccessNotify('Product removed from cart');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-4">Add some products to your cart!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({getTotalItems()} items)</h1>
        <button
          onClick={handleClearCart}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>🗑️</span>
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cart.map((item) => (
              <div key={item.product.id} className="border-b border-gray-200 py-4 last:border-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-24 h-24 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{item.product.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.product.description}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-200 rounded">
                          <button 
                            className="px-3 py-1 text-gray-700 hover:bg-gray-300 rounded-l"
                            onClick={() => handleQuantityChange(item.product.id, -1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-700 font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            className="px-3 py-1 text-gray-700 hover:bg-gray-300 rounded-r"
                            onClick={() => handleQuantityChange(item.product.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-500">${item.product.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-5">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-green-600">${getTotalPrice()}</span>
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors mb-3">
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;