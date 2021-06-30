import Table from 'components/Table';
import Wrapper from 'components/Wrapper';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { APIPOS } from 'utils/axios';
import { setAPIPOS } from 'utils/axios';
import Cookies from 'js-cookie';
import { moneyFormat } from 'utils/helper';

const Cart = ({ order }) => {
  const user = JSON.parse(localStorage.getItem('dataUser'));
  const [nama, setnama] = useState(user.name);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [note, setNote] = useState('');
  const [paymethod, setPaymethod] = useState('CASH');
  const { orderDetail } = order;
  const dispatch = useDispatch();
  const ADD = (id) => {
    let newData = [];
    for (let a = 0; a <= orderDetail.length - 1; a++) {
      if (orderDetail[a].productId == id) {
        orderDetail[a].qty += 1;
      }
      newData.push(orderDetail[a]);
    }
    dispatch({
      type: 'ADD QTY',
      payload: newData
    });
  };
  const REMOVE = (id) => {
    let newData = [];
    for (let a = 0; a <= orderDetail.length - 1; a++) {
      if (orderDetail[a].productId == id && orderDetail[a].qty != 0) {
        orderDetail[a].qty -= 1;
      }
      newData.push(orderDetail[a]);
    }
    dispatch({
      type: 'REMOVE QTY',
      payload: newData
    });
  };
  const TotalHarga = (data) => {
    let total = 0;
    for (let i = 0; i <= data.length - 1; i++) {
      total += data[i].qty * data[i].unitPrice;
    }
    return total;
  };
  const Submit = () => {
    const data = {
      'user': {
        'name': nama.toUpperCase(),
        'phoneNumber': phone
      },
      'priceOrder': TotalHarga(orderDetail),
      'orderName': nama.toUpperCase(),
      'orderNote': note,
      'paymentMethod': paymethod,
      'orderDetails': orderDetail
    };
    setAPIPOS(`Bearer ${Cookies.get('token')}`);
    APIPOS.post('api/v1/productorders', data)
      .then((res) => {
        if (res?.data) {
          alert('Berhasil ditambahkan');
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err.response.data);
      });
  };

  // console.log(paymethod);
  useEffect(() => {
    setnama(user.name);
    setPhone(user.phoneNumber);

    // console.log(user);
  }, []);

  return (
    <Wrapper title="Cart">
      <div className="px-8 mb-10">
        {orderDetail.length > 0 && (
          <table className="w-full">
            <thead className="bg-pink-400 rounded">
              <tr className="text-center text-white">
                <th class="w-1/4 p-2 font-sans">Nama barang</th>
                <th class="w-28 ">Harga</th>
                <th class="w-100 ">Jumlah</th>
                <th class="w-1/2 ">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.length > 0
                ? orderDetail.map((data) => (
                    <tr>
                      <td class="w-1/4 text-center">{data.name}</td>
                      <td class="w-1/4 text-center">
                        {moneyFormat(data.unitPrice, 'Rp ')}
                      </td>
                      <td class="w-1/4 text-center">
                        <button
                          onClick={() => REMOVE(data.productId)}
                          className="w-10 bg-pink-400 m-5"
                        >
                          -
                        </button>
                        {data.qty}
                        <button
                          className="w-10 bg-pink-400 m-5"
                          onClick={() => ADD(data.productId)}
                        >
                          +
                        </button>
                      </td>
                      <td class="w-1/4 text-center">
                        {moneyFormat(data.qty * data.unitPrice, 'Rp ')}
                      </td>
                    </tr>
                  ))
                : null}
              {orderDetail.length > 0 ? (
                <tr>
                  <td class="w-1/4 text-center"></td>
                  <td class="w-1/4 text-center"></td>
                  <td class="w-1/4 text-center p-2 bg-pink-400 font-bold text-white">
                    TOTAL HARGA
                  </td>
                  <td class="w-1/4 text-center p-2 bg-pink-400 font-bold text-white">
                    {moneyFormat(TotalHarga(orderDetail), 'Rp ')}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
      <div className="px-8">
        <div>
          <input
            className="border-0 px-3 py-3 mb-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            type="text"
            value={nama}
            onChange={(e) => setnama(e.target.value)}
            placeholder="Nama"
          />
        </div>
        <div>
          <input
            className="border-0 px-3 py-3 mb-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Wa/Phone"
          />
        </div>
        <div>
          <input
            className="border-0 px-3 py-3 mb-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
          />
        </div>
        <div>
          <select
            className="border-0 px-3 py-3 mb-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            onChange={(e) => setPaymethod(e.target.value)}
          >
            <option value={'CASH'}>{'CASH'}</option>
            <option value={'TRANSFERBANK'}>{'TRANSFERBANK'}</option>
          </select>
        </div>
        <div>
          <button
            className="border-0 px-3 py-3 mb-5 placeholder-gray-400 bg-gray-900 text-gray-100 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            onClick={() => Submit()}
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.ProductOrder
  };
};

export default connect(mapStateToProps, {})(Cart);
