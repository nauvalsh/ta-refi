import Card from 'components/Card';
import Wrapper from 'components/Wrapper';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { APIPOS } from 'utils/axios';

function Product({ search }) {
  const [products, setProduct] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    APIPOS.get('api/v1/products')
      .then((res) => {
        setProduct(res.data.data.products);
        dispatch({
          type: 'SET PRODUCT',
          payload: res.data.data.products
        });
        console.log('memek');
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setFiltered(
      products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <Wrapper title="Products">
      <div className="px-8 flex flex-wrap">
        {products.length > 0
          ? filtered.map((data, index) => (
              <Card
                name={data.productName}
                stock={data.stock}
                price={data.price}
                img={data.image}
                id={data.id}
              />
            ))
          : null}
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.AuthReducer.search
  };
};

export default connect(mapStateToProps, {})(Product);
