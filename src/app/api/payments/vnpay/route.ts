import { NextRequest, NextResponse } from 'next/server';
import { createVNPayService } from '@/lib/vnpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, orderInfo, bankCode } = body;

    // Validate input
    if (!orderId || !amount || !orderInfo) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, amount, orderInfo' },
        { status: 400 }
      );
    }

    // Get client IP
    const ipAddr = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

    // Create VNPay service
    const vnpayService = createVNPayService();

    // Create payment URL
    const paymentUrl = vnpayService.createPaymentUrl({
      orderId,
      amount: parseFloat(amount),
      orderInfo,
      orderType: 'billpayment',
      ipAddr: ipAddr.split(',')[0].trim(),
      locale: 'vn',
      bankCode: bankCode || undefined,
    });

    return NextResponse.json({
      success: true,
      paymentUrl,
    });
  } catch (error: any) {
    console.error('VNPay payment creation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create payment URL',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
