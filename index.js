import express from 'express';
import Razorpay from 'razorpay';
import  morgan from 'morgan';
import * as dotenv from 'dotenv'
import cors from 'cors'
const app = express();
dotenv.config();

app.use(cors());
app.use(morgan('combined'));
const port = 6969;

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID, // Your Razorpay key
  key_secret: process.env.SECRET_KEY // Your Razorpay secret
});

app.use(express.json());

// API to create Razorpay order
app.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: `razorUser${Math.random()*1000}@gmail.com`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // Send order details to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
