const stripeAPI= require('../stripe');

async function createCheckoutSession(req, res) {
    const domainUrl = process.env.WEB_APP_URL;
    const { line_items, customer_email } = req.body;
    // check req body has line items and email
    if (!line_items || !customer_email) {
        return res.status(400).json({ error: 'missing required session parameters' });
    }

    let session;

    try {
        session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card', 'bancontact', 'eps', 'giropay', 'ideal', 'p24', 'sepa_debit', 'sofort'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/canceled`,
            shipping_address_collection: { allowed_countries: ['GB', 'US', 'CH', 'DE'] },
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: 300,
                      currency: 'eur',
                    },
                    display_name: 'Shipping with official post',
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 2,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    }
                  }
                }
            ]
        });
        res.status(200).json({ sessionId: session.id, });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'an error occured, unable to create session'});
    }
}

module.exports = createCheckoutSession;