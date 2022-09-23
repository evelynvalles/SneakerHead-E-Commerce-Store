import React, { useState, useEffect } from 'react'
import { commerce } from '../../lib/commerce'
import { useParams } from "react-router-dom"
import { Container, Typography, Button, Select, InputLabel, MenuItem, FormControl } from "@mui/material"
import styles from "./OneProduct.module.css"

const OneProduct = ( { onHandleUpdateCartQty, cart } ) => {
  const [product, setProduct] = useState({})
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('')

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      },
    },
  };

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id)
    const { name, price, image, variant_groups, description } = response
    setProduct({
      id, 
      name,
      price: price.formatted_with_symbol,
      src: image.url,
      variant_groups,
      description
    });
  }

  const handleChange = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    fetchProduct(id)
  }, [id])


  return (
    <Container>
      <div style={{height: "64px"}}/>
      <div className={styles.productBox}>
          <div className={styles.colOne}>
            <img onLoad={() => {setLoading(false)}} src={product.src} alt={product.name} className={styles.image} title={product.name}/>
          </div>
          <div className={styles.colTwo}>
              <Typography variant="h4" sx={{fontWeight: 550}}>{product.name}</Typography>
              <div className={styles.smallBox}/>
              <Typography variant="h6" sx={{marginTop: ".8rem"}}>{product.price}</Typography>
              <Typography sx={{marginTop: ".8rem"}} dangerouslySetInnerHTML={{__html: product.description}}/>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Size</InputLabel>
                  <Select labelId="demo-select-small" id="demo-select-small" value={size} label="Size" onChange={handleChange} MenuProps={MenuProps} color="secondary">
                    <MenuItem value=""><em>Please Select a Size</em></MenuItem>
                    {product.variant_groups?.length ?
                      product.variant_groups[0].options?.map((eachSize, i) => (
                        <MenuItem key={i} value={eachSize.name}>{eachSize.name}</MenuItem>
                      ))
                      : null
                    }
                  </Select>
                </FormControl>
              </div>
              <div className={styles.btns}>
                <Button type="button" size="small" variant="contained" onClick={() => onHandleUpdateCartQty(cart.id, cart.quantity - 1)} color="secondary">-</Button>
                <Typography sx={{margin: "0 1rem"}}>1</Typography>
                <Button type="button" size="small" variant="contained" onClick={() => onHandleUpdateCartQty(cart.id, cart.quantity + 1)} color="secondary">+</Button>
              </div>
              <Button size="medium" variant="contained" sx={{marginTop: "2.5rem"}}>Add to Cart</Button>
          </div>
      </div>
    </Container>
  )
}

export default OneProduct