import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


import ProductCard from "./ProductCard"
import Selector from "./Selector";


export default function ProductCardList({products}) {
    return (
        <React.Fragment>
            <Container fixed>
                <Selector/>
                <Grid container spacing={2} direction="row">
                    {products.map(product =>
                        <Grid item xs={3}>
                            <ProductCard product={product} key={product.sku}/>
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}
