import ListUserTransaksiDetail from 'components/ListUserTransaksiDetail';
import Wrapper from 'components/Wrapper';
import React from 'react';
import { useLocation } from 'react-router';

const User = () => {
  const location = useLocation();
  const user = location.state.user || null;

  console.log(user);

  return (
    <div>
      <Wrapper title="Transaksi Customer">
        <div className="p-10">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <table>
              <tr>
                <td className="px-2 py-1 font-bold">Name</td>
                <td className="px-2 py-1">:</td>
                <td className="px-2 py-1">{user && user.name}</td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-bold">Nomor Telepon</td>
                <td className="px-2 py-1">:</td>
                <td className="px-2 py-1">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://wa.me/62${user.phoneNumber}?text=halo`}
                  >
                    {user && user.phoneNumber} ☎
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-bold">Email</td>
                <td className="px-2 py-1">:</td>
                <td className="px-2 py-1">
                  <a target="_blank" rel="noreferrer" href={`mailto:user.email`}>
                    {user && user.email} ✉
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="px-10 overflow-scroll">
          {<ListUserTransaksiDetail orders={user.productOrders} />}
        </div>
      </Wrapper>
    </div>
  );
};

export default User;
