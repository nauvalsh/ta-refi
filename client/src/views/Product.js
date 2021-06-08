import React from 'react';

import Navbar from 'components/Navbar.js';
import Sidebar from 'components/Sidebar.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Wrapper from 'components/Wrapper';
import Card from 'components/Card';

function Product() {
  return (
    <Wrapper title="Products">
      <div className="px-8 flex flex-wrap">
        <Card name={'Shampo Lifebuoy'} stock={2} price={12000} />
        <Card name={'Shampo Lifebuoy'} stock={2} price={12000} />
        <Card name={'Shampo Lifebuoy'} stock={2} price={12000} />
      </div>
    </Wrapper>
  );
}

export default Product;
