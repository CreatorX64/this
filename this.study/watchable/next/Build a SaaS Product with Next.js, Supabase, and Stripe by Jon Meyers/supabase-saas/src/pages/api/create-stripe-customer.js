import initStripe from "stripe";
import { getServiceSupabase } from "../../utils/supabase";

export default async function handler(req, res) {
  if (req.headers["api-route-secret"] !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API.");
  }

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const customer = await stripe.customers.create({
    email: req.body.record.email
  });

  const supabase = getServiceSupabase();

  await supabase
    .from("profiles")
    .update({
      stripe_customer: customer.id
    })
    .eq("id", req.body.record.id);

  res.send({ message: `Stripe customer created: ${customer.id}` });
}
