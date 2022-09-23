import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'


const Review = ( {checkoutToken} ) => {

    return (
        <>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <List disablePadding>
            {
                checkoutToken.line_items.map((product, i) => (
                    <ListItem style={{padding: "10px 0"}} key={i}>
                        <img src={product.image.url} alt={product.product_name} style={{objectFit: "cover", height: "6.35rem", width: "10rem", marginRight: "2rem"}}/>
                        <ListItemText primary={product.product_name} secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.price.formatted_with_symbol}</Typography>
                    </ListItem>
                ))
            }
            <ListItem style={{padding: "10px 0", borderTop: "1px solid black"}}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" style={{fontWeight: 700}}>{checkoutToken.subtotal.formatted_with_symbol}</Typography>
            </ListItem>
        </List>
        </>
    )
}

export default Review