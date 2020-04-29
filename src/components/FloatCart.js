import React from 'react';

import firebase from "../shared/firebase";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import CartList from "./CartList";

const db = firebase.database().ref();

const useStyles = makeStyles({
    list: {
        width: 350,
    },
    subtotal:{
        margin: '15px 15px'
    },
});

export default function FloatCart({cartOpen, setCartOpen, cartList, setCartList, inventory}) {
    const classes = useStyles();


    const setCartClose = (event) => {
        if (event.type === 'Tab') {
            setCartOpen(false);
        }
    };

    const totalAmount = (cartList) => {
        let count;
        let sum = 0;
        for(count = 0; count < cartList.length; count++){
            sum += cartList[count].product.price * cartList[count].qty;
        }
        return sum;
    };

    const handleCheckOut = () => {
        db.child('inventory').update(inventory);
        window.confirm("You have checked out your products!")
    };

    return (
        <React.Fragment>
            <Grid container justify="flex-end">
                <IconButton size="large" onClick={() => setCartOpen(true)} color="primary" aria-label="shopping cart">
                    <ShoppingCartIcon />
                </IconButton>
            </Grid>
            <Drawer anchor='right' open={cartOpen} onClose={setCartClose}>
                <div className={classes.list}>
                    <Button onClick={() => setCartOpen(false)}>close</Button>
                    <CartList cartList={cartList} setCartList={setCartList} setCartOpen={setCartOpen} inventory={inventory}/>
                    <div className={classes.subtotal}>
                        <Typography variant="h6" color="textSecondary">
                            SUBTOTAL: {totalAmount(cartList)}
                        </Typography>
                    </div>
                    <Grid container justify="center"><Button variant='outlined' onClick={handleCheckOut}>Check Out</Button></Grid>
                </div>
            </Drawer>
        </React.Fragment>

    );
}


