import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FloatCart from "./FloatCart";


import ProductCard from "./ProductCard"
import Selector from "./Selector";


export default function ProductCardList({products, inventory}) {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartList, setCartList] = useState([]);


    return (
        <React.Fragment>
            <FloatCart cartOpen={cartOpen} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList} inventory={inventory}/>
            <Container fixed>
                <Selector/>
                <Grid container spacing={2} direction="row">
                    {products.map(product =>
                        <Grid item xs={3} key={product.sku + product.size}>
                            <ProductCard product={product} setCartOpen={setCartOpen} cartList={cartList} setCartList={setCartList} inventory={inventory}/>
                        </Grid>)
                    }
                </Grid>
            </Container>
        </React.Fragment>
    );
}
