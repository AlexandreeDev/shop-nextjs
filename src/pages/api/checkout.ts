import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { priceId } = request.body;

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!priceId) {
    return response.status(400).json({ error: "Price not found." });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;

  const cancelUrl = `${process.env.NEXT_URL}/`;
  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelUrl,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
  });
  return response.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
