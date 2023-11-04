const stripe = require('stripe')('sk_test_51O8WKDIxxan7cBV50DEZwX0JMqrMoiJgdouYEVJtpLJrUcg5728bmIdzRPg5tYhY1l4zk3u6DVMQXtnN0FI0yjRB00o0DajBFR');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});