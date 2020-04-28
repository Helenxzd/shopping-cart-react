import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 700,
        padding: 5,
    },
    media: {
        height: 500,
    },
    center: {
        textAlign: 'center',
    },
    sizeButton: {
        borderRadius: 8,
        margin: 1,
        padding: 1,
    },
});


export default function ProductCard({product, setCartOpen, cartList, setCartList, inventory}) {
    const classes = useStyles();

    const sizes = { S: 'S', M: 'M', L: 'L', XL: 'XL'};

    const isSizeIn = (size) =>{
        return inventory[product.sku][size] > 0;
    };

    const [click, setClick] = useState(false);
    const [productSize, setProductSize] = useState('S');

    const handleSizeClick = (size) => {
        setClick(true);
        setProductSize(size);
        // console.log(productSize);
    };

    const handleAddCart = () => {
        setCartOpen(true);
        let tempCart = cartList.slice(0);
        let count;
        for(count = 0; count < tempCart.length; count++){
            if (tempCart[count].product.sku === product.sku && tempCart[count].size === productSize) {
                tempCart[count].qty += 1;
                inventory[product.sku][productSize] -= 1;
                break;
            }
        }
        if(count===tempCart.length){
            tempCart.push({product : product, qty : 1, size : productSize});
            inventory[product.sku][productSize] -= 1;
        }
        setCartList(tempCart);
        setClick(false);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={"data/products/"+product.sku+"_1.jpg"}
                />
                <CardContent className={classes.center}>
                    <Typography gutterBottom variant='subtitle1' component="p">
                        {product.title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        $ {product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container justify="space-around">
                    {Object.values(sizes).map(size => <Button color="default" variant="outlined"
                                                              className={classes.sizeButton} disabled={!isSizeIn(size)}
                                                              onClick={() => handleSizeClick(size)}
                                                              key={size}>{size}</Button>)}
                </Grid>
            </CardActions>
            <CardActions>
                <Grid container justify="center">
                    <Button size="large" variant="contained" color="primary" onClick={handleAddCart} disabled={!click}>
                        Add to cart
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
}
