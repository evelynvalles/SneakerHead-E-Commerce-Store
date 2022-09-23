import React from 'react'
import { TextField, Grid } from '@mui/material'
import { Controller, useFormContext } from "react-hook-form"

const FormInput = ( { name, label } ) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller control={control} 
            fullwidth 
            name={name} 
            render = {({field}) => (
                <TextField fullWidth
                label={label}
                required />
            )
            }
            />
        </Grid>
    )
}

export default FormInput