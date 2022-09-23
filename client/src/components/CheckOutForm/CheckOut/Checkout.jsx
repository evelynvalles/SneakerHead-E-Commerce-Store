import React, { useState, useEffect } from 'react'
import { Typography, Paper, Stepper, StepLabel, Step, CssBaseline, Divider, Button } from "@mui/material"
import { commerce } from '../../../lib/commerce'
import { Link, useNavigate } from "react-router-dom"
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ["Shipping address", "Payment details"]

const Checkout = ( {cart, order, onCaptureCheckout, error} ) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async() => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {type: "cart"});
        setCheckoutToken(token)
      }
      catch (error) {
        navigate.pushState("/")
      }
    }
    generateToken();
  }, [cart])

  const Form = () => activeStep === 0
  ? <AddressForm checkoutToken={checkoutToken} next={next} />
  : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 )
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 )

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  const Confirmation = () => (
    <>
    <div>
      <Typography variant="5h">Thank you for your purchase!</Typography>
      <Divider sx={{margin: '20px 0'}}/>
      <Typography variant="subtitle2">Order Ref: #</Typography>
    </div>
    <br />
    <Link to="/" style={{textDecoration: "none"}}><Button type="button" variant="outlined">Back to Home</Button></Link>
    </>
  ) 


  return (
    <>
      <CssBaseline />
      <div style={{height: "64px"}}/>
      <main style={{ marginTop: '5%', width: 'auto', margin: "0 15rem"}}>
        <Paper sx={{margin: "3rem 0", padding: 2}}>
          <Typography variant='h4' align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} sx={{padding: "3rem 0 5rem 0"}}>
            {
              steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))
            }
          </Stepper>
          { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
        </Paper>
      </main>
    </>
  )
}

export default Checkout