import axios from "axios";
import initStripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useUserContext } from "../context/user";

export async function getStaticProps() {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);

      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans
    }
  };
}

export default function PricingPage({ plans }) {
  const { user, login, isLoading } = useUserContext();

  const showSubscribeButton = user && !user.is_subscribed;
  const showCreateAccountButton = !user;
  const showManageSubscriptionButton = user && user.is_subscribed;

  async function processSubscription(planId) {
    const { data } = await axios.get(`/api/subscription/${planId}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl justify-around py-16">
      {plans.map((plan) => (
        <div key={plan.id} className="h-40 w-80 rounded px-6 py-4 shadow">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            {plan.price / 100} / {plan.interval}
          </p>

          {!isLoading && (
            <div>
              {showSubscribeButton && (
                <button onClick={() => processSubscription(plan.id)}>
                  Subscribe
                </button>
              )}

              {showCreateAccountButton && (
                <button onClick={login}>Create Account</button>
              )}

              {showManageSubscriptionButton && (
                <Link href="/dashboard">
                  <a>Manage Subscription</a>
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
