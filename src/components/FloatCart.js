import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
    }
});

export default function FloatCart({cartOpen, setCartOpen, cartList, setCartList}) {
    const classes = useStyles();

    const setCartClose = (event) => {
        if (event.type === 'Tab') {
            setCartOpen(false);
        }
    };

    return (
        <React.Fragment>
            <Button onClick={() => setCartOpen(true)}>Cart</Button>
            <Drawer anchor='right' open={cartOpen} onClose={setCartClose}>
                <div className={classes.list}>
                    <Button onClick={() => setCartOpen(false)}>close</Button>
                    <div>
                        {cartList.map(item =>
                            <Card className={classes.root}>
                                <CardMedia
                                    className={classes.image}
                                    image={"data/products/"+item.product.sku+"_2.jpg"}
                                    height="50"
                                />
                                <CardContent className={classes.details}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {item.product.title}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                        $ {item.product.price}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary">
                                        quantity: {item.qty}
                                    </Typography>
                                </CardContent>
                            </Card>
                         )}
                    </div>
                </div>
            </Drawer>
        </React.Fragment>

    );
}


