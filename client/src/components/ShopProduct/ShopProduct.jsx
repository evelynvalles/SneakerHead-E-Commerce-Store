import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material'
import { ShoppingCart } from "@mui/icons-material"
import { Link } from "react-router-dom"

const ShopProduct = ({ product, onAddToCart }) => {

    return (
        <Card sx={{flexGrow: 1, maxWidth: '100%'}}>
            <CardMedia sx={{height: 0, paddingTop: '65.25%'}} image={product.image.url} title={product.name} />
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5' gutterBottom>
                        <Link to={`/shop/shoe/${product.id}`} style={{textDecoration: "none", color: "purple"}}>{product.name}</Link>
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end'}}> 
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <ShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ShopProduct