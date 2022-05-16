import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("product info in api", req.body);

    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1L056GBWpizOfpLUx9fKW174" }],
        line_items: req.body.cart.map((item) => {
          console.log("item info ", item);
          const img = item.image.asset._ref;
          const newImg = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/pfwbau69/production/"
            )
            .replace("-jpg", ".jpg");
          console.log("new image", newImg);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/response/success`,
        cancel_url: `${req.headers.origin}/response/warning`,
      };
      // Create Checkout Sessions from body params.

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
