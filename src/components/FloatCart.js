import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import CartList from "./CartList";

const useStyles = makeStyles({
    list: {
        width: 350,
    },
    root:{
        display: 'flex',
    },
    details:{
        display: 'flex',
        flexDirection: 'column',
    },
    image:{
        padding: 5,
        flex: '1 0 auto',
        maxWidth: 40,
        margin: '5px 5px',
    },
    subtotal:{
        margin: '15px 15px'

    }
});

export default function FloatCart({cartOpen, setCartOpen, cartList, setCartList}) {
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
    return (
        <React.Fragment>
            <Button onClick={() => setCartOpen(true)}>Cart</Button>
            <Drawer anchor='right' open={cartOpen} onClose={setCartClose}>
                <div className={classes.list}>
                    <Button onClick={() => setCartOpen(false)}>close</Button>
                    <CartList cartList={cartList} setCartList={setCartList} setCartOpen={setCartOpen}/>
                    <div className={classes.subtotal}>
                        <Typography variant="h6" color="textSecondary">
                            SUBTOTAL: {totalAmount(cartList)}
                        </Typography>
                    </div>
                </div>
            </Drawer>
        </React.Fragment>

    );
}


