import React, { useEffect, useState } from 'react';

import firebase from "./shared/firebase";
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import ProductCardList from "./components/ProductCardList";

const db = firebase.database().ref();


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [inv, setInv] = useState({});
  const inventory = inv;

  const [user, setUser] = useState(null);
  const [cartList, setCart] = useState([]);


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

      db.child('inventory').on('value', handleData, error => alert(error));

      return () => { db.off('value', handleData); };
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, [user]);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result)=>{
        db.child('cart').child(result.user.uid).update(cartList);
        return false;
      }
    }
  };

  const SignIn = () => {
    return(
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );
  };

  const Welcome = ({user}) => {
    return (
        <div style={{ width: '100%' }}>
          <Box bgcolor="text.primary" color="background.paper" display="flex">
            <Box p={1} flexGrow={1} alignItems="center">
              <Typography variant="h6">Welcome, {user.displayName}</Typography>
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

  const Banner = ({user}) => {
    return(
        <React.Fragment>
          {user ? <Welcome user={ user }/> : <SignIn/>}
        </React.Fragment>
    );
  };




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
        <Banner user={ user } cartList={cartList} />
        <div>
          {
            <ProductCardList cartList={cartList} setCart={setCart} products={products} inventory={inventory} uid={user? user.uid : null}/>
          }
        </div>
      </React.Fragment>
      // <React.Fragment>
      //
      //   {products.map(product => <ProductCard product={product} key={product.sku}/>)}
      //
      // </React.Fragment>
  );
};

export default App;