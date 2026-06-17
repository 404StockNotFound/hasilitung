import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function GET() {
  try {
//     console.log("SERVER KEY:", process.env.MIDTRANS_SERVER_KEY);
// console.log("CLIENT KEY:", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    const snap = new midtransClient.Snap({
      
      isProduction: false, 
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
      
    });
    

    const orderId = `calc-${Date.now()}`;

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: 2000,
      },
    });

    return NextResponse.json({
      token: transaction.token,
    });
} catch (err: any) {
  console.error(err);

  return NextResponse.json(
    {
      error: err?.message || "Gagal membuat transaksi",
    },
    {
      status: 500,
    }
  );
}
}