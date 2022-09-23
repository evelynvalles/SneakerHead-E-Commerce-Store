import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material'
import { useForm, FormProvider } from "react-hook-form"
import { Link } from "react-router-dom"
import {commerce} from "../../lib/commerce"
import FormInput from './FormInput'

const AddressForm = ( {checkoutToken, next } ) => {
    const methods = useForm()
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState("")

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));

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

    const fetchSubdivision = async () => {
        const {subdivisions} = await commerce.services.localeListSubdivisions("US")
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    useEffect(() => {
        fetchSubdivision(checkoutToken.id)
    }, [])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingSubdivision}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First Name" />
                        <FormInput name="lastName" label="Last Name" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="address1" label="Address" />
                        <FormInput name="city" label="City" />
                        <FormInput name="ZIP" label="Zip Code/Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Select State</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)} MenuProps={MenuProps}>
                                {
                                    subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Link to="/cart" style={{textDecoration: "none"}}><Button variant="outlined" color="secondary">Back to Cart</Button></Link>
                            <Button variant="contained" type="submit">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm