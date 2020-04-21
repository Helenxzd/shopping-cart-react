import React, { useEffect, useState } from 'react';

import ProductCardList from "./components/ProductCardList";

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [inv, setInv] = useState({});
  const inventory = inv;

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('./data/products.json');
  //     const json = await response.json();
  //     setData(json);
  //   };
  //   fetchProducts();
  // }, []);
   useEffect(() => {
     const fetchInv = async () => {
       const resp = await fetch('./data/inventory.json');
       const ivenjson = await resp.json();
       setInv(ivenjson);
     };
     fetchInv();
   },[]);

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
        <ProductCardList products={products} inventory={inventory}/>
      </React.Fragment>
      // <React.Fragment>
      //
      //   {products.map(product => <ProductCard product={product} key={product.sku}/>)}
      //
      // </React.Fragment>
  );
};

export default App;