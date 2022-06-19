require('dotenv').config()

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
app.use(express.json())
app.use(express.static('public'))
app.use(
   cors({
      origin: 'http://localhost:5500'
   })
)

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([
   [1, { priceInCents: 1499, name: 'Air Pods Cleaner Premium' }],
   [2, { priceInCents: 999, name: 'Air Pods Cleaner Standard'}]
])

app.post('/create-checkout-session', async (req, res) => {
   try {
      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'CH']
         },
         shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 200,
                  currency: 'usd',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                }
              }
            }],
         line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
               price_data: {
                  currency: 'usd',
                  product_data: {
                     name: storeItem.name
                  },
                  unit_amount: storeItem.priceInCents,
               },
               quantity: item.quantity
            }
         }),
         success_url: `${process.env.CLIENT_URL}/success.html`,
         cancel_url: `${process.env.CLIENT_URL}/cancel.html`
      })
      res.json({ url: session.url })
   } catch (e) {
      res.status(510).json({ error: e.message})
   }
})

app.listen(3000)

app.get('/shop', function(req, res) {
   fs.readFile('items.json', function(error, data) {
      if (error) {
         res.status(500).end()
      } else {
         res.render('/public/shop.ejs', {
            stripePublicKey: stripePublicKey,
            items: JSON.parse(data)
         })
      }
   })
})