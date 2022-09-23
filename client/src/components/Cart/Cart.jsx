import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { Link } from "react-router-dom"
import CartItem from './CartItem/CartItem'

const Cart = ( {cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart } ) => {

    if (!cart.line_items) return "Loading...."

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, <Link to="/shop" style={{color: "red", textDecoration: "none"}}>start adding some!</Link></Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} onHandleUpdateCartQty={handleUpdateCartQty} onHandleRemoveFromCart={handleRemoveFromCart}/>
                        </Grid>
                    ))
                }
            </Grid>
            <div style={{ display: 'flex', marginTop: '10%', width: '100%', justifyContent: 'space-between'}}>
                <Typography variant="h4">SubTotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button sx={{ minWidth: '150px', marginRight: "2.5rem"}} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Link to="/checkout" style={{textDecoration: "none"}}><Button sx={{ minWidth: '150px'}} size="large" type="button" variant="contained" color="primary">Checkout</Button></Link>
                </div>
            </div>
        </>
    )

    return (
        <Container sx={{marginBottom: "2rem"}}>
            <div style={{height: "64px"}}/>
            <Typography sx={{ marginTop: '3.5%',}} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart