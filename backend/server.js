const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user.models');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));
app.use(bodyParser.json());


const dbUrl = process.env.MONGODB_URI


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const create_customer = async (user) => {

    const customer = await stripe.customers.create({
        email: user.email,
        name: user.firstName + ' ' + user.lastName,
        shipping: {
          address: {
            city: user.city,
            country: user.country,
            line1: user.address,
          },
          name: user.firstName + ' ' + user.lastName,
        },
        address: {
          city: user.city,
          country: user.country,
          line1: user.address,
        },
      });

      return customer;
};



app.post('/api/subscribe', async (req, res) => {

    const { customerId, priceId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
          
            mode: 'subscription',
            line_items: [
              {
                price: priceId,
                // For metered billing, do not pass quantity
                quantity: 1,
              },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/failure',
          });
          res.status(ok).json({url: session.url})
         
    }
    catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    
});


app.post("/webhook", async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    
    data = event.data;
    eventType = event.type;
  } else {
    
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case 'checkout.session.completed':
      const customer_email = data.object.customer_email;
      const customer = await User.findOne({ email: customer_email });
      customer.subscriptionStatus = true;
      customer.subscriptionId = 'monthly_subscription';
      await customer.save();
      break;
    case 'invoice.paid':
      
      break;
    case 'invoice.payment_failed':
      
      break;
    default:
      
  }

  res.sendStatus(200);
});



app.post('/api/login', async (req, res) => {

    console.log('Checking login:', req.body);

    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful', customerId: user.customerId });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error checking login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.post('/api/register',  async (req, res) => {

    console.log('Registering new user:', req.body);
    const  hashedPassword = await bcrypt.hash(req.body.password, 10);    
   
    
try {
    const customer = await create_customer(req.body); 

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
        customerId: customer.id,
        subscriptionStatus: false,
        subscriptionId: '',
    });   
    const profile = await newUser.save();
    
    console.log('New user saved successfully:', profile);
    res.status(201).json({ message: 'Registration successful' });
}
catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});






app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



