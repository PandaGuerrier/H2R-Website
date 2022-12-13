import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stripe from '@ioc:Mezielabs/Stripe'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class WebhooksController {
    public async handle({ request, response }: HttpContextContract) {
        const sig = request.header('stripe-signature')
        let event
        try {
          event = Stripe.webhooks.constructEvent(
            request.raw()!,
            sig!,
            Env.get('STRIPE_WEBHOOK_SECRET'),
          )
        } catch (error) {
          response.status(400).send(`Webhook Error: ${error.message as string}`)
          return
        }
    // CB TEST: 4242424242424242

        switch (event.type) {
            case 'checkout.session.completed':
                
                const subscription = event.data.object

                const user = await User.query().where('email', subscription.customer_details.email).first()

                user?.related('subscription').create({
                    stripeId: subscription.id,
                    price: subscription.amount_total,
                    endAt: subscription.current_period_end
                })
                
                const role = await Role.query().where('name', 'argent').first() as Role
                user?.related('roles').attach([role?.id])
                break;
            case 'customer.subscription.deleted':
                console.log("customer.subscription.deleted")
                break;
        }

        return event
    }

    public async createCheckoutIron({ response, auth }: HttpContextContract) {

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1LxTquF8SlN7HJemMsRbXJ3k',
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            customer_email: auth.user?.email,
            success_url: Env.get("LOCALHOST") + 'success',
            cancel_url: Env.get("LOCALHOST") + 'cancel',
        })

        const url = session.url ? session.url : Env.get("LOCALHOST")

        return response.redirect(url)
    }

    public async createCheckoutDiamond({ response, auth }: HttpContextContract) {

        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1LxTquF8SlN7HJemMsRbXJ3k',
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            customer_email: auth.user?.email,
            success_url: Env.get("LOCALHOST") + 'success',
            cancel_url: Env.get("LOCALHOST") + 'cancel',
        })

        const url = session.url ? session.url : Env.get("LOCALHOST")

        return response.redirect(url)
    }
}