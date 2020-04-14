import React from 'react';
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

export default function ProductCard({product}) {
    const classes = useStyles();
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
                    <Button color="black" variant="outlined" className={classes.sizeButton}>
                        S
                    </Button>
                    <Button color="black" variant="outlined" className={classes.sizeButton}>
                        M
                    </Button>
                    <Button color="black" variant="outlined" className={classes.sizeButton}>
                        L
                    </Button>
                    <Button color="black" variant="outlined" className={classes.sizeButton}>
                        XL
                    </Button>
                </Grid>
            </CardActions>
            <CardActions>
                <Grid container justify="center">
                    <Button size="large" variant="contained" color="primary">
                        Add to cart
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
}