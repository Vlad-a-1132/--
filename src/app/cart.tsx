import React from 'react';

const Cart = () => {
  // Placeholder for cart items
  const cartItems = [
    { id: 1, name: 'Ручка', price: 10 },
    { id: 2, name: 'Блокнот', price: 20 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="border-b py-2">
              {item.name} - {item.price} руб.
            </li>
          ))}
        </ul>
      )}
      <button className="mt-4 bg-blue-500 text-white p-2 rounded">Оформить заказ</button>
    </div>
  );
};

export default Cart; 