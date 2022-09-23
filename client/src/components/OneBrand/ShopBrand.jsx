import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, CircularProgress } from '@mui/material'
import { ShoppingCart } from "@mui/icons-material"
import { Link } from "react-router-dom"

const ShopBrand = ( { brand, onAddToCart } ) => {
    return (
        <div>
            <Card sx={{ flexGrow: 1, maxWidth: '100%' }}>
                <CardMedia sx={{ height: 0, paddingTop: '65.25%' }} image={brand.image.url} title={brand.name} />
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5' gutterBottom>
                            <Link to={`/shop/shoe/${brand.id}`} style={{ textDecoration: "none", color: "purple" }}>{brand.name}</Link>
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {brand.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html: brand.description }} variant="body2" color="textSecondary" />
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(brand.id, 1)}>
                        <ShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default ShopBrand