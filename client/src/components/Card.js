import React from 'react';
import { moneyFormat } from 'utils/helper';

const Card = ({ name, stock, price }) => {
  return (
    <div className="flex flex-col max-w-xs m-2 bg-white px-8 py-6 rounded-xl space-y-5 items-center shadow-lg">
      <h3 className="font-serif font-bold text-gray-900 text-xl">{name}</h3>
      <img
        className="w-full rounded-md"
        src="https://coffeeordie.com/wp-content/uploads/2019/03/FraserCOVER2.jpg"
        alt="motivation"
      />
      <p className="self-start">
        <p className="self-start font-bold text-lg"> {moneyFormat(price, 'Rp')}</p>

        <p className="self-start my-0">Stock: {stock}</p>
      </p>

      <button className="w-full py-4 bg-gray-900 rounded-md text-white text-sm focus:border-transparent">
        + Add To Cart
      </button>
    </div>
  );
};

export default Card;
