import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FloatCart from "./FloatCart";

import ProductCard from "./ProductCard"
import Selector from "./Selector";
import firebase from "../shared/firebase";

const db = firebase.database().ref();


export default function ProductCardList({cartList, setCart, products, inventory, uid}) {
    const [cartOpen, setCartOpen] = useState(false);
    // const [cartList, setCart] = useState([]);

    const setCartList = (data) => {
        if(uid) {
            setCart(data);
            db.child('cart').child(uid).set(data);
        }
        else{
            setCart(data);
        }
    };

    // console.log(userData[user]);
    // console.log(cartList);

    // if(userData) {setCartList(userData)}

    // const [userData, setUserData] = useState([]);
    //
    //
    // useEffect(() => {
    //     const handleData = snap => {
    //         setUserData(snap.val());
    //     };
    //     db_user.on('value', handleData, error => alert(error));
    //     return () => { db_user.off('value', handleData); };
    // }, [uid]);


    // if(userCart[uid]) {
    //     setCartList(Object.values(userCart));
    // }
    // console.log(Object.values(userCart));

    // if(userData[user.uid])
    // if(userData[user.uid]) {setCartList(userData[user.uid]);}

    // if(user) {
    //     console.log(userCart);
    //     if(userCart[user.uid]) {
    //         console.log(user.uid);
    //         setCartList(userCart[user.uid]);
    //     }
    // }

    return (
        <React.Fragment>
            <FloatCart cartOpen={cartOpen} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList} inventory={inventory} uid={uid}/>
            <Container fixed>
                <Selector/>
                <Grid container spacing={2} direction="row">
                    {products.map(product =>
                        <Grid item xs={3} key={product.sku + product.size}>
                            <ProductCard product={product} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList} inventory={inventory}/>
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}
