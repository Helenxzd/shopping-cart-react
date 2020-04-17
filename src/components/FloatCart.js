import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    list: {
        width: 350,
    },
});

export default function FloatCart({cartOpen, setCartOpen, cartList, setCartList}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Button onClick={() => setCartOpen(true)}>Cart</Button>
            <Drawer anchor='right' open={cartOpen}>
                <div className={classes.list}>
                    <Button onClick={() => setCartOpen(false)}>close</Button>
                    <div>
                        {cartList.map(product => <div>{product.title}</div>)}
                    </div>
                </div>
            </Drawer>
        </React.Fragment>

    );
}


