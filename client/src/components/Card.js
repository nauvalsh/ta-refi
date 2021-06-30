import { data } from 'autoprefixer';
import envs from 'envs';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { moneyFormat } from 'utils/helper';
const Card = ({ name, stock, price, img, order, id }) => {
  const { orderDetail } = order;
  const dispatch = useDispatch();

  const onClick = (id, price, name) => {
    const data = {
      'productId': id,
      'unitPrice': price,
      'qty': 1,
      'discount': 0,
      'name': name
    };
    if (orderDetail.length < 1) {
      dispatch({
        type: 'ADD ORDER DETAIL',
        payload: [data]
      });
    } else {
      const newData = [];
      for (let i = 0; i <= orderDetail.length - 1; i++) {
        if (orderDetail[i].productId != id) {
          newData.push(orderDetail[i]);
        }
      }
      dispatch({
        type: 'ADD ORDER DETAIL',
        payload: [...newData, data]
      });
    }
  };

  return (
    <div className="flex flex-col max-w-xs m-2 bg-white px-8 py-6 rounded-xl space-y-5 items-center justify-between shadow-lg">
      <h3 className="font-serif font-bold text-gray-900 text-xl">{name}</h3>
      <img
        className="rounded-md h-60 w-60"
        src={`${envs.URL}images/products/` + img}
        alt="motivation"
      />
      <p className="self-start">
        <p className="self-start font-bold text-lg"> {moneyFormat(price, 'Rp')}</p>

        <p className="self-start my-0">Stock: {stock}</p>
      </p>
      <button
        className="w-full py-4 bg-gray-900 rounded-md text-white text-sm focus:border-transparent"
        onClick={() => onClick(id, price, name)}
      >
        + Add To Cart
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.ProductOrder
  };
};

export default connect(mapStateToProps, {})(Card);
