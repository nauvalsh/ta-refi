import React, { useEffect, useState } from 'react';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import { APIPOS } from 'utils/axios';

function ProductAdd() {
  const errorMessage = null;

  const [category, setCategory] = useState([]);

  useEffect(() => {
    APIPOS.get('api/v1/categories')
      .then((res) => {
        setCategory(res.data.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  let initialValues = {
    categoryName: '',
  };

  const formOnSubmit = (val) => {
    console.log('SUBMIT');
  };

  return (
    <Wrapper title="Add Product">
      <div className="px-4 md:px-10 mx-auto">
        <form>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Product Name"
              style={{ transition: 'all .15s ease' }}
              name="productName"
            />
            <p className="text-red-500 text-xs"></p>
          </div>
          <div className="relative w-full mb-3">
            <select
              name="categoryId"
              id=""
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            >
              {category.length > 0 &&
                category.map((cat) => <option value={cat.id}>{cat.categoryName}</option>)}
            </select>

            <p className="text-red-500 text-xs"></p>
          </div>

          <div className="relative w-full mb-3">
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Price"
              style={{ transition: 'all .15s ease' }}
              name="price"
            />
            <p className="text-red-500 text-xs"></p>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
              type="submit"
              style={{ transition: 'all .15s ease' }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 px-10">
        <div className="p-10 bg-white shadow-lg rounded-md">
          <table className="w-1/2">
            <thead>
              <tr>
                <th className="text-left pb-4">Product Name</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rokok</td>
                <td className="text-center">100</td>
                <td className="text-center">Delete</td>
              </tr>
              <tr>
                <td>Mie Instant</td>
                <td className="text-center">100</td>
                <td className="text-center">Delete</td>
              </tr>
              <tr>
                <td>Sabun</td>
                <td className="text-center">100</td>
                <td className="text-center">Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}

export default ProductAdd;
