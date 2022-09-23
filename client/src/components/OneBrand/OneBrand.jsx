import React, { useEffect, useState } from 'react'
import { Grid } from "@mui/material"
import { commerce } from "../../lib/commerce"
import { useParams } from 'react-router-dom'
import ShopBrand from './ShopBrand'

const OneBrand = ( {onAddToCart} ) => {
    const [brand, setBrand] = useState([])
    const { slug } = useParams();
    const [loaded, setLoaded] = useState(false)

    const fetchBrand = async (slug) => {
        const response = await commerce.products.list({ category_slug: slug })
        console.log(response.data)
        setBrand(response.data)
        setLoaded(true)
    }

    useEffect(() => {
        fetchBrand(slug)
    }, [slug])

    return (
        <div>
            {
                loaded ?             
                    <div style={{flexGrow: 1, padding: "5rem", backgroundColor: "rgb(243, 239, 239)"}}>
                    <div style={{height: "64px"}}/>
                    <Grid container justify="center" spacing={4}>
                        {
                            brand.map((eachBrand) => (
                                <Grid item key={eachBrand.id} xs={12} sm={6} md={4} lg={3}>
                                    <ShopBrand brand={eachBrand} onAddToCart={onAddToCart}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                    </div>
                    :
                    <h1>Loading..</h1>
            }
        </div>
    )
}

export default OneBrand