import React from 'react'
import { Typography, Button, Divider, CssBaseline } from "@mui/material"
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY_API_KEY)

const PaymentForm = ( {checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep} ) => {

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement })

    if (error) {
      console.log(error)
    }
    else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: { 
          name: "Domestic", 
          street: shippingData.address1,
          town_city: shippingData.city,
          state: shippingData.shippingSubdivision,
          country: "US",
          postal_zip_code: shippingData.zip
        },
        billing: {
          name: "Domestic",
          county_state: shippingData.shippingSubdivision,
          country: "US"
        }, 
        fulfillment: { shipping_method: "ship_gvRjwOmYB54mNL" },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep()
    }
  }

  return (
    <>
    <CssBaseline />
    <Review checkoutToken={checkoutToken}/>
    <Divider />
    <Typography variant="h6" gutterBottom style={{margin: "20px 0"}}>Payment Method</Typography>
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {( { elements, stripe } ) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Button variant='outlined' onClick={backStep}>Back</Button>
              <Button type="submit" variant='contained' disabled={!stripe}>
                Pay { checkoutToken.subtotal.formatted_with_symbol }
              </Button>
            </div>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
    </>
  )
}

export default PaymentForm