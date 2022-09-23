import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import logo from "../../assets/SneakerHeadLogo.png"
import { Link } from "react-router-dom"

const NavBar = ({ totalItems, categories }) => {

    return (
        <div>
            <AppBar position="fixed" color="inherit" sx={{ flexGrow: 1, boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.12)'}}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" sx={{ alignItems: 'center', display: 'flex', textDecoration: 'none', marginRight: "5rem"}}>
                        <img src={logo} alt="SneakerHead Logo" height="28px" style={{margin: '0 20px 0 10px'}} />
                        SneakerHead
                    </Typography>
                    <div style={{flexGrow: 1, display: "flex", justifyContent: "space-evenly", alignItems: 'center'}}>
                    <MenuItem><Link style={{textDecoration: "none", color: "black"}} to="/">Home</Link></MenuItem>
                    <MenuItem><Link style={{textDecoration: "none", color: "black"}} to="/shop">Shop</Link></MenuItem>
                    {categories?.length ?
                        categories.map((eachCategory, i) => (
                            <MenuItem key={i}><Link style={{textDecoration: "none", color: "black"}} to={`/shop/${eachCategory.slug}`}>{eachCategory.name}</Link></MenuItem>
                        ))
                        : null
                    }
                    <MenuItem><Link style={{textDecoration: "none", color: "black"}} to={`/`}>About</Link></MenuItem>
                    </div>
                    <div style={{marginLeft: "10rem"}}>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary"><Link to="/cart"><ShoppingCart /></Link></Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar