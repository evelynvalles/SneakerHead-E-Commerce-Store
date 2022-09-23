import React from 'react'
import { Grid } from "@mui/material"
import ShopProduct from '../ShopProduct/ShopProduct'

const ShopAllProducts = ({ products, onAddToCart}) => {

  return (
    <div>
      <div style={{flexGrow: 1, padding: "5rem", backgroundColor: "rgb(243, 239, 239)"}}>
          <div style={{height: "64px"}}/>
          <Grid container justify="center" spacing={4}>
            {
              products.map((eachProduct) =>(
                <Grid item key={eachProduct.id} xs={12} sm={6} md={4} lg={3}>
                  <ShopProduct product={eachProduct} onAddToCart={onAddToCart}/>
                </Grid>  
              ))
            }
          </Grid>
      </div>
    </div>
  )
}

export default ShopAllProducts