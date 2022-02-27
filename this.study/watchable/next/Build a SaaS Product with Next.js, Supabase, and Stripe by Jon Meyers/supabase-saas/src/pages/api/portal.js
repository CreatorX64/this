import cookie from "cookie";
import initStripe from "stripe";
import { supabase } from "../../utils/supabase";

export default async function handler(req, res) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const token = cookie.parse(req.headers.cookie)["sb-access-token"];

  supabase.auth.session = () => ({
    access_token: token
  });

  const {
    data: { stripe_customer }
  } = await supabase
    .from("profiles")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: `${process.env.CLIENT_URL}/dashboard`
  });

  res.send({
    url: session.url
  });
}
