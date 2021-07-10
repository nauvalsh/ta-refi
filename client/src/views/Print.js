import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { APIPOS } from 'utils/axios';
import { moneyFormat } from 'utils/helper';

const Print = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const history = useHistory();

  useEffect(() => {
    APIPOS.get(`api/v1/productorders/${id}`)
      .then((res) => {
        console.log(res.data.productOrders);
        setOrder(res.data.productOrders);

        setTimeout(() => {
          window.print();
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <>
      <div id="tombol" class="buttonPrint text-center mt-3">
        <button
          onClick={() => history.push('/orders')}
          className="px-2 py-1 bg-purple-500 mr-3 rounded-md text-white"
        >
          {' '}
          Back
        </button>
        <button
          onClick={() => window.print()}
          className="px-2 py-1 bg-pink-500 rounded-md text-white"
        >
          {' '}
          Print
        </button>
      </div>
      <div className="page">
        <header className="mb-3 flex flex-row justify-between">
          <h1 className="text-lg font-bold">Toko Ibu Lina</h1>
          <h1 className="text-sm">Order ID: #{order && `${order.id}`.padStart(5, 0)}</h1>
        </header>
        <hr />
        <main className="mt-4">
          <table>
            {order && (
              <>
                <tr>
                  <td>Order Name</td>
                  <td className="px-4">: </td>
                  <td>{order.orderName}</td>
                </tr>
                <tr>
                  <td>Order Date</td>
                  <td className="px-4">: </td>
                  <td>{dayjs(order.orderDate).format('DD MMMM YYYY')}</td>
                </tr>
                <tr>
                  <td>Order Status</td>
                  <td className="px-4">: </td>
                  <td>{order.orderStatus}</td>
                </tr>
                <tr>
                  <td>Payment Method</td>
                  <td className="px-4">: </td>
                  <td>{order.paymentMethod}</td>
                </tr>
              </>
            )}
          </table>
        </main>
        <main className="mt-6">
          <table style={{ width: '54em' }}>
            <tr>
              <td className="border border-gray-600 p-2">No</td>
              <td className="border border-gray-600 p-2">Nama Barang </td>
              <td className="border border-gray-600 p-2">Harga</td>
              <td className="border border-gray-600 p-2">Qty</td>
              <td className="border border-gray-600 p-2">Harga Total</td>
            </tr>
            {order &&
              order.productOrderDetails.map((item, index) => (
                <tr>
                  <td className="border border-gray-600 p-2">{index + 1}</td>
                  <td className="border border-gray-600 p-2">
                    {item.product.productName}{' '}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {moneyFormat(item.unitPrice, 'Rp ')}
                  </td>
                  <td className="border border-gray-600 p-2">{item.qty}</td>
                  <td className="border border-gray-600 p-2">
                    {moneyFormat(item.qty * item.unitPrice, 'Rp ')}
                  </td>
                </tr>
              ))}

            <tr>
              <td colSpan="4"></td>
              <td className="border border-gray-600 p-2">
                {order && moneyFormat(order.priceOrder, 'Rp ')}
              </td>
            </tr>
          </table>

          <div className="mt-8">{order && order.orderNote}</div>
        </main>
      </div>
    </>
  );
};

export default Print;
