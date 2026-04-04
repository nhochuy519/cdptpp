import { NextRequest, NextResponse } from 'next/server';
import { createVNPayService } from '@/lib/vnpay';
import Order from '@/models/Order';
import connectDB from '@/lib/db/connect';

export async function GET(request: NextRequest) {
  try {
    // Get all query params
    const searchParams = request.nextUrl.searchParams;
    const vnpParams: Record<string, string> = {};
    
    searchParams.forEach((value, key) => {
      vnpParams[key] = value;
    });

    // Verify return URL
    const vnpayService = createVNPayService();
    const verifyResult = vnpayService.verifyReturnUrl(vnpParams);

    if (!verifyResult.isValid) {
      // Redirect to failed page
      return NextResponse.redirect(
        new URL(`/payment/failed?message=${encodeURIComponent(verifyResult.message)}`, request.url)
      );
    }

    // Check if payment was successful
    if (vnpParams.vnp_ResponseCode === '00' && verifyResult.data) {
      // Connect to database
      await connectDB();

      // Update order status
      const order = await Order.findOne({ orderNumber: verifyResult.data.orderId });
      
      if (order) {
        order.paymentStatus = 'paid';
        order.paymentDetails = {
          transactionId: verifyResult.data.transactionNo,
          paidAt: new Date(),
          paymentGateway: 'vnpay',
        };
        
        // Update order status to confirmed
        if (order.orderStatus === 'pending') {
          order.orderStatus = 'confirmed';
        }
        
        await order.save();
      }

      // Redirect to success page
      return NextResponse.redirect(
        new URL(`/payment/success?orderId=${verifyResult.data.orderId}`, request.url)
      );
    } else {
      // Payment failed
      return NextResponse.redirect(
        new URL(
          `/payment/failed?orderId=${verifyResult.data?.orderId}&message=${encodeURIComponent(verifyResult.message)}`,
          request.url
        )
      );
    }
  } catch (error: any) {
    console.error('VNPay return handler error:', error);
    return NextResponse.redirect(
      new URL(`/payment/failed?message=${encodeURIComponent('Có lỗi xảy ra khi xử lý thanh toán')}`, request.url)
    );
  }
}
