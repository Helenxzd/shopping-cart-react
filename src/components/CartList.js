import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

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

export default function CartList({cartList, setCartList, setCartOpen}) {
    const classes = useStyles();

    const handleDeleteItem = (deleteSku) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === deleteSku) {
                tempCart.splice(i, 1);
                break;
            }
        }
        setCartList(tempCart);
    };

    const addQty = (addSku) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === addSku) {
                tempCart[i].qty += 1;
            }
        }
        setCartList(tempCart);
    };

    const rmvQty = (rmvSku) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === rmvSku) {
                if (tempCart[i].qty > 1){
                    tempCart[i].qty -= 1;
                }
                else{
                    tempCart.splice(i, 1);
                }
            }
        }
        setCartList(tempCart);
    };

    return (
        <Container maxWidth="lg">
            {cartList.map(item =>
                <Card className={classes.root} key={item.product.sku}>
                    <CardMedia
                        className={classes.image}
                        image={"data/products/"+item.product.sku+"_2.jpg"}
                        height="50"
                    />
                    <CardContent className={classes.details}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.product.title}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            $ {item.product.price}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            <IconButton aria-label="remove" onClick={() => rmvQty(item.product.sku)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            quantity: {item.qty}
                            <IconButton aria-label="add" onClick={() => addQty(item.product.sku)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Typography>
                    </CardContent>
                    <IconButton aria-label="clear" onClick={() => handleDeleteItem(item.product.sku)}>
                        <ClearIcon />
                    </IconButton>
                </Card>
            )}
        </Container>
    );
}