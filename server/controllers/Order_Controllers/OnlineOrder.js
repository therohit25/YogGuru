const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = async (req, res) => {
  try {
    const products = req.body.cart;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.ProductDet.ProductName,
        },
        unit_amount: product.ProductDet.ProductPrice * 100,
      },
      quantity: product.Quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `http://localhost:5173/Success?productData=${encodeURIComponent(
        JSON.stringify(products)
      )}`,
      cancel_url: `http://localhost:5173/Failure`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error " + error?.message);
    res.json({ error: error.message });
  }
};
