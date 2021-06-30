import React, { useEffect, useState } from 'react';
import Wrapper from 'components/Wrapper';
import { APIPOS, setAPIPOS } from 'utils/axios';
import dayjs from 'dayjs';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { moneyFormat } from 'utils/helper';

const Orders = ({ search }) => {
  const distpatch = useDispatch();
  const [productOrders, setProductOrders] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    setAPIPOS(`Bearer ${token}`);
    APIPOS.get('api/v1/productorders')
      .then((res) => {
        setProductOrders(res.data.data.productOrders);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    distpatch({
      type: 'clearSearch'
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      productOrders.filter((order) =>
        order.orderName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, productOrders]);

  const converTime = (data) => {
    return dayjs(data).format('DD MMMM YYYY');
  };
  const history = useHistory();
  const toOrderDetail = (data) => {
    distpatch({
      type: 'RES ORDERS',
      payload: data
    });
    history.push('/detail-order');
  };
  return (
    <div>
      <Wrapper title="Orders">
        <div className="p-10 overflow-x-scroll">
          <table className="w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className=" text-sm p-2">
                  <p className="text-gray-300 text-left">Nama</p>
                </th>
                <th className=" text-sm p-2">
                  <span className="text-gray-300">Payment method</span>
                </th>
                <th className=" text-sm p-2">
                  <span className="text-gray-300">Status</span>
                </th>

                <th className=" text-sm p-2">
                  <span className="text-gray-300">Tanggal</span>
                </th>
                <th className=" text-sm p-2">
                  <span className="text-gray-300">Price</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {productOrders.length > 0
                ? filteredCountries.map((data) => (
                    <tr className="">
                      <td
                        className="p-2 cursor-pointer"
                        onClick={() => history.replace(`/print/${data.id}`)}
                      >
                        <p className="text-pink-500 font-normal text-left text-sm">
                          {data.orderName} ⎙
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-gray-800 font-normal text-center text-xs">
                          {data.paymentMethod}
                        </p>
                      </td>
                      <td className="p-2">
                        <p
                          className={` font-normal text-center text-sm ${
                            data.orderStatus === 'completed'
                              ? 'text-green-500'
                              : 'text-yellow-600'
                          }`}
                        >
                          {data.orderStatus}
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-gray-800 font-normal text-center text-sm">
                          {converTime(data.orderDate)}
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-gray-800 font-normal text-center text-sm">
                          {moneyFormat(data.priceOrder, 'Rp')}
                        </p>
                      </td>
                      <td className="p-2">
                        <p className="text-gray-800 font-normal text-center text-sm cursor-pointer">
                          ✓
                        </p>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </Wrapper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.AuthReducer.search
  };
};

export default connect(mapStateToProps, {})(Orders);
