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
    clearButton:{
        marginLeft: 'auto'
    }
});

export default function CartList({cartList, setCartList, setCartOpen, inventory}) {
    const classes = useStyles();

    const handleDeleteItem = (deleteSku, deleteSize) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === deleteSku && tempCart[i].size === deleteSize) {
                inventory[deleteSku][tempCart[i].size] += tempCart[i].qty;
                tempCart.splice(i, 1);
                break;
            }
        }
        setCartList(tempCart);
    };

    const addQty = (addSku, addSize) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === addSku && tempCart[i].size === addSize && inventory[addSku][tempCart[i].size] > 0) {
                tempCart[i].qty += 1;
                inventory[addSku][tempCart[i].size] -= 1;
            }
        }
        setCartList(tempCart);
    };

    const rmvQty = (rmvSku, rmvSize) => {
        let tempCart = cartList.slice(0);
        for(let i = 0; i < tempCart.length; i++){
            if (tempCart[i].product.sku === rmvSku && tempCart[i].size === rmvSize) {
                if (tempCart[i].qty > 1){
                    tempCart[i].qty -= 1;
                    inventory[rmvSku][tempCart[i].size] += 1;
                }
                else{
                    inventory[rmvSku][tempCart[i].size] += 1;
                    tempCart.splice(i, 1);
                }
            }
        }
        setCartList(tempCart);
    };

    return (
        <Container maxWidth="lg">
            {cartList.map(item =>
                <Card className={classes.root} key={item.product.sku + item.size}>
                    <CardMedia
                        className={classes.image}
                        image={"data/products/"+item.product.sku+"_2.jpg"}
                        height="50"
                    />
                    <CardContent className={classes.details}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.product.title}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            size: {item.size}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            $ {item.product.price}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            <IconButton aria-label="remove" size={"small"} onClick={() => rmvQty(item.product.sku, item.size)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            quantity: {item.qty}
                            <IconButton aria-label="add" size={"small"} onClick={() => addQty(item.product.sku, item.size)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Typography>
                    </CardContent>
                    <IconButton aria-label="clear" size={"small"} className={classes.clearButton} onClick={() => handleDeleteItem(item.product.sku, item.size)}>
                        <ClearIcon />
                    </IconButton>
                </Card>
            )}
        </Container>
    );
}