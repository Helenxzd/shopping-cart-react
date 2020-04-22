import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


import ProductCardList from "./components/ProductCardList";

const firebaseConfig = {
  apiKey: "AIzaSyAWiV-UOI6Pca_cEdAy7siffGsKhRp6XDA",
  authDomain: "shopping-cart-react-70b60.firebaseapp.com",
  databaseURL: "https://shopping-cart-react-70b60.firebaseio.com",
  projectId: "shopping-cart-react-70b60",
  storageBucket: "shopping-cart-react-70b60.appspot.com",
  messagingSenderId: "747299287859",
  appId: "1:747299287859:web:1d0e4238bba20288990446",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [inv, setInv] = useState({});
  const inventory = inv;


   // useEffect(() => {
   //   const fetchInv = async () => {
   //     const resp = await fetch('./data/inventory.json');
   //     const ivenjson = await resp.json();
   //     setInv(ivenjson);
   //   };
   //   const fetchProducts = async () => {
   //     const response = await fetch('./data/products.json');
   //     const json = await response.json();
   //     setData(json);
   //   };
   //   fetchInv();
   //   fetchProducts();
   // },[]);


  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();

      const handleData = snap => {
        setInv(snap.val());
        setData(json);
      };
      db.on('value', handleData, error => alert(error));

      return () => { db.off('value', handleData); };
    };
    fetchProduct();
  }, []);

  // useEffect(() => {
  //     const handleData = snap => {
  //       setInv(snap.val());
  //     };
  //     db.on('value', handleData, error => alert(error));
  //     return () => { db.off('value', handleData); };
  // }, []);




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