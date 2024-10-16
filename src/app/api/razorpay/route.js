const Razorpay = require("razorpay");
const shortid = require("shortid");

import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = (await request.json())["amount"];
  const currency = "INR";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    //update the paymentID on firebase
    return NextResponse.json(
      {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
