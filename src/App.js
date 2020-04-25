import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

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

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
    <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
    />
);

const Welcome = ({ user }) => {
  return (
      <div style={{ width: '100%' }}>
        <Box bgcolor="text.primary" color="background.paper" display="flex">
          <Box p={1} flexGrow={1} alignItems="center">
            <Typography>Welcome, {user.displayName}</Typography>
          </Box>
          <Box p={1}>
            <Button variant="contained" onClick={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </Box>
        </Box>
      </div>
  );
};

const Banner = ({ user }) => (
    <React.Fragment>
      { user ? <Welcome user={ user } /> : <SignIn /> }
    </React.Fragment>
);

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [inv, setInv] = useState({});
  const inventory = inv;

  const [user, setUser] = useState(null);


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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
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
        <Banner user={ user } />
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