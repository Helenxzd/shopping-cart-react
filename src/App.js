import React, { useEffect, useState } from 'react';

import ProductCardList from "./components/ProductCardList";

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
      // <ProductCardList products={products}/>
      <React.Fragment>
        <ProductCardList products={products}/>
      </React.Fragment>
      // <React.Fragment>
      //
      //   {products.map(product => <ProductCard product={product} key={product.sku}/>)}
      //
      // </React.Fragment>
  );
};

export default App;