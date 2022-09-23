import React from 'react'
import { Typography, Button, Card, CardActions, CardMedia, CardContent } from "@mui/material"

const CartItem = ({ item, onHandleUpdateCartQty, onHandleRemoveFromCart }) => {

    return (
        <Card sx={{marginTop: "2.5rem"}}>
            <CardMedia image={item.image.url} atl={item.name} sx={{height: 260}}/>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: "1rem"}}>
                    <Button type="button" size="small" onClick={() => onHandleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onHandleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onHandleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem