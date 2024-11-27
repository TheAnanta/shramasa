const Razorpay = require("razorpay");
const shortid = require("shortid");

import { NextRequest, NextResponse } from "next/server";

export async function POST(request, response) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  try {
    const responseR = await razorpay.payments.fetch(
      (
        await request.json()
      ).payment_id
    );
    //update the paymentID on firebase
    return NextResponse.json(responseR, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
