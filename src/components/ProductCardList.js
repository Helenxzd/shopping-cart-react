import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FloatCart from "./FloatCart";


import ProductCard from "./ProductCard"
import Selector from "./Selector";


export default function ProductCardList({products}) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartList, setCartList] = useState([]);

    return (
        <React.Fragment>
            <FloatCart cartOpen={cartOpen} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList}/>
            <Container fixed>
                <Selector/>
                <Grid container spacing={2} direction="row">
                    {products.map(product =>
                        <Grid item xs={3}>
                            <ProductCard product={product} key={product.sku} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList}/>
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}
