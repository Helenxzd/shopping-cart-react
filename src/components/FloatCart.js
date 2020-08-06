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
    button: {
        width: 64, height: 64,
        padding: 0,
    },
    icon: {
        width: 64, height: 64,
    },
    tooltip: {
        marginLeft:7
    },
    banner: {
        width: '100%',
        height: '50px',
        lineHeight: '50px',
        fontsize: 40,
        backgroundColor: '#001f33',
        textAlign: 'center',
        color: '#FFF',
    }
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

    const styles = {
        button: {
            width: 50, height: 50,
            padding: 0,
        },
        icon: {
            fontsize: 200
        },
        tooltip: {
            marginLeft: 7
        }
    };

    return (
        <React.Fragment>
            <Grid container justify="space-between">
                <Typography style={{marginLeft:10, paddingTop: 5, fontSize: 20}}>Pick Something you like and enjoy shopping!</Typography>
                <Typography style={{paddingLeft: 10, marginRight: 10, fontSize: 20, backgroundColor: '#d1e0e0', borderRadius: '20%'}}>Cart
                    <IconButton style={styles.button} iconStyle={styles.icon} tooltipStyles={styles.tooltip} onClick={() => setCartOpen(true)} aria-label="shopping cart">
                        <ShoppingCartIcon />
                    </IconButton>
                </Typography>
            </Grid>
            <Drawer anchor='right' open={cartOpen} onClose={setCartClose}>
                <div className={classes.banner}>My Shopping Cart</div>
                <div className={classes.list}>
                    <Button onClick={() => setCartOpen(false)}>close</Button>
                    <CartList cartList={cartList} setCartList={setCartList} setCartOpen={setCartOpen} inventory={inventory}/>
                    <div className={classes.subtotal}>
                        <Typography variant="h6" color="textSecondary">
                            SUBTOTAL: {totalAmount(cartList).toFixed(2)}
                        </Typography>
                    </div>
                    <Grid container justify="center"><Button variant='outlined' onClick={handleCheckOut}>Check Out</Button></Grid>
                </div>
            </Drawer>
        </React.Fragment>

    );
}


