import React from 'react';
import { Link } from 'react-router-dom';

import NotificationDropdown from './NotificationDropdown.js';
import UserDropdown from './UserDropdown.js';
import { connect, useDispatch } from 'react-redux';
function Sidebar({ order: { orderDetail } }) {
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const user = JSON.parse(localStorage.getItem('dataUser'));

  // console.log(user);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            TOKO IBU LINA
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    TOKO IBU LINA
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {user && user.role === 'admin' && (
                <>
                  <li className="items-center">
                    <Link
                      className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                      to="/dashboard"
                    >
                      <i className="fas fa-tv opacity-75 mr-2 text-sm"></i> Dashboard
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link
                      className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                      to="/category"
                    >
                      <i className="fas fa-list opacity-75 mr-2 text-sm"></i> Category
                    </Link>
                  </li>
                </>
              )}

              <li className="items-center">
                <Link
                  className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                  to="/cart"
                >
                  <i className="fas fa-cube opacity-75 mr-2 text-sm"></i> Cart{' ('}
                  {orderDetail.length})
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                  to="/orders"
                >
                  <i className="fas fa-cart-arrow-down opacity-75 mr-2 text-sm"></i> Order
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                  to="/product"
                >
                  <i className="fas fa-cube opacity-75 mr-2 text-sm"></i> Product
                </Link>
              </li>

              {user && user.role === 'admin' && (
                <>
                  <li className="items-center">
                    <Link
                      className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                      to="/product/add"
                    >
                      <i className="fas fa-cube opacity-75 mr-2 text-sm"></i> Add Product
                    </Link>
                  </li>

                  <li className="items-center">
                    <Link
                      className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                      to="/users"
                    >
                      <i className="fas fa-users opacity-75 mr-2 text-sm"></i> Customer
                    </Link>
                  </li>
                </>
              )}

              {/* <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{' '}
                  Profile Page
                </Link>
              </li> */}

              {/* <li className="items-center">
                <a
                  className="text-blueGray-300 text-xs uppercase py-3 font-bold block"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-tools text-blueGray-300 mr-2 text-sm"></i> Settings
                  (soon)
                </a>
              </li> */}
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Contact Us
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <a
                  className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
                  href="https://wa.me/6281222695881"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp mr-2 text-blueGray-400 text-base"></i>{' '}
                  081222695881
                </a>
              </li>
              <li className="inline-flex">
                <a
                  className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
                  href="mailto:refiandi@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-envelope-open-text mr-2 text-blueGray-400 text-base"></i>{' '}
                  refi@gmail.com
                </a>
              </li>
              <li className="inline-flex">
                <a
                  className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold"
                  href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/quick-start"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-paint-brush mr-2 text-blueGray-400 text-base"></i>{' '}
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    order: state.ProductOrder
  };
};

export default connect(mapStateToProps, {})(Sidebar);
