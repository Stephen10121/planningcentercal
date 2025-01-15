import { plans } from "$lib/utils";
import { json } from "@sveltejs/kit";
import Stripe from "stripe";
import { config } from "dotenv";

config();

export async function POST({ request, locals }) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        console.error("STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET env var is not set.");
        return json({msg: "not ok"}, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log("hello");
    const body = await request.text();
    console.log("yellow");
    const signature = request.headers.get('stripe-signature') || "";

    let event;

    console.log({ body, signature, secret: process.env.STRIPE_WEBHOOK_SECRET})
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err}`);
        return json({ error: err }, { status: 400 });
    }

    const data = event.data;
    const eventType = event.type;

    try {
        switch (eventType) {
            case "checkout.session.completed":
            case "customer.subscription.updated": {
                //@ts-ignore
                const session = await stripe.checkout.sessions.retrieve(data.object.id, {
                    expand: ['line_items']
                });

                const customerId = session?.customer as string;
                const customer = await stripe.customers.retrieve(customerId);

                console.log(session.line_items, session.id)

                const priceId = session.line_items?.data[0].price?.id;
                const plan = plans.find((p) => p.priceId === priceId);

                if (!plan) break;

                //@ts-ignore
                const user = await locals.pb.collection('users').getFirstListItem(`subscriptionEmail="${customer.email}"`);

                await locals.pb.collection('users').update(user.id, {
                    priceId,
                    hasAccess: true,
                    customerId
                });

                break
            }
        case "customer.subscription.deleted": {
            //@ts-ignore
            const subscription = await stripe.subscriptions.retrieve(data.object.id);

            const user = await locals.pb.collection('users').getFirstListItem(`customerId="${subscription.customer}"`);

            console.log(user.name, "is deleting their subscription.");

            await locals.pb.collection('users').update(user.id, {
                hasAccess: false,
            });

            break
        }
        }
    } catch (err) {

    }

    return json({msg: "ok"});
}