# 🔐 Tích hợp VNPay - Hướng dẫn đầy đủ

## 📋 Tổng quan

Dự án đã được tích hợp VNPay payment gateway để hỗ trợ thanh toán trực tuyến. Tài liệu này hướng dẫn cấu hình và sử dụng.

## 🚀 Cấu hình

### 1. Environment Variables

Thêm các biến sau vào file `.env.local`:

```env
# VNPay Configuration
VNPAY_TMN_CODE=T9TOMWLD
VNPAY_HASH_SECRET=9TQWKBH6TV2YQRXD9FZM0YZFY36GCW1F
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=https://your-domain.com/api/payments/vnpay/return
```

**Lưu ý:**
- `VNPAY_TMN_CODE` và `VNPAY_HASH_SECRET` trên là thông tin test merchant
- `VNPAY_RETURN_URL` phải là URL đầy đủ của domain bạn (production hoặc Vercel)
- Môi trường test: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`
- Môi trường production: `https://vnpayment.vn/paymentv2/vpcpay.html`

### 2. Thông tin Test Merchant

**Merchant Test:**
- TMN Code: `T9TOMWLD`
- Hash Secret: `9TQWKBH6TV2YQRXD9FZM0YZFY36GCW1F`

**Thẻ test:**
- Số thẻ: `9704198526191432198`
- Tên chủ thẻ: `NGUYEN VAN A`
- Ngày phát hành: `07/15`
- Mật khẩu OTP: `123456`

## 📁 Cấu trúc Code

### Files đã tạo:

```
src/
├── lib/
│   └── vnpay.ts                              # VNPay service library
├── app/
│   ├── api/
│   │   └── payments/
│   │       └── vnpay/
│   │           ├── route.ts                  # API tạo payment URL
│   │           └── return/
│   │               └── route.ts              # API xử lý callback
│   ├── checkout/
│   │   └── page.tsx                          # Trang checkout (đã update)
│   └── payment/
│       ├── success/
│       │   └── page.tsx                      # Trang thanh toán thành công
│       └── failed/
│           └── page.tsx                      # Trang thanh toán thất bại
└── models/
    └── Order.ts                              # Model Order (đã update)
```

## 🔄 Luồng thanh toán

1. **Khách hàng chọn VNPay** tại trang checkout
2. **Tạo đơn hàng** → API `/api/orders` (POST)
3. **Tạo payment URL** → API `/api/payments/vnpay` (POST)
4. **Redirect** khách hàng đến VNPay
5. **Khách hàng thanh toán** trên VNPay
6. **VNPay callback** → API `/api/payments/vnpay/return` (GET)
7. **Update order status** → `paymentStatus: 'paid'`
8. **Redirect** đến trang success/failed

## 🧪 Test Local

### 1. Chạy development server

```bash
npm run dev
```

### 2. Expose local với ngrok (để VNPay callback)

```bash
ngrok http 3000
```

### 3. Update VNPAY_RETURN_URL

```env
VNPAY_RETURN_URL=https://your-ngrok-url.ngrok.io/api/payments/vnpay/return
```

### 4. Test thanh toán

1. Vào `http://localhost:3000/checkout`
2. Điền thông tin đơn hàng
3. Chọn "Thanh toán VNPay"
4. Click "Đặt hàng ngay"
5. Sẽ redirect đến VNPay sandbox
6. Nhập thông tin thẻ test
7. Xác nhận OTP: `123456`
8. Kiểm tra redirect về trang success

## 🚀 Deploy lên Vercel

### 1. Push code lên GitHub

```bash
git add .
git commit -m "Add VNPay integration"
git push
```

### 2. Deploy trên Vercel

1. Vào https://vercel.com/dashboard
2. Import project từ GitHub
3. Add Environment Variables:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `JWT_SECRET`
   - `VNPAY_TMN_CODE`
   - `VNPAY_HASH_SECRET`
   - `VNPAY_URL`
   - `VNPAY_RETURN_URL` (dùng domain Vercel của bạn)

### 3. Cấu hình VNPAY_RETURN_URL

```env
VNPAY_RETURN_URL=https://your-app.vercel.app/api/payments/vnpay/return
```

## 📝 API Documentation

### POST /api/payments/vnpay

Tạo payment URL để redirect khách hàng đến VNPay.

**Request:**
```json
{
  "orderId": "ORD-1234567890",
  "amount": 500000,
  "orderInfo": "Thanh toan don hang ORD-1234567890",
  "bankCode": "NCB" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?..."
}
```

### GET /api/payments/vnpay/return

Xử lý callback từ VNPay sau khi khách hàng thanh toán.

**Query Params:** VNPay sẽ gửi tất cả params cần thiết

**Response:** Redirect đến `/payment/success` hoặc `/payment/failed`

## 🔍 Troubleshooting

### Lỗi: "VNPay configuration is missing"

**Nguyên nhân:** Thiếu environment variables

**Giải pháp:**
- Kiểm tra file `.env.local` có đầy đủ config VNPay
- Restart development server sau khi thêm env vars

### Lỗi: "Chữ ký không hợp lệ"

**Nguyên nhân:** Hash secret không đúng hoặc params bị thay đổi

**Giải pháp:**
- Kiểm tra `VNPAY_HASH_SECRET` chính xác
- Không modify URL callback từ VNPay

### Lỗi: Không redirect về sau khi thanh toán

**Nguyên nhân:** `VNPAY_RETURN_URL` không đúng

**Giải pháp:**
- Kiểm tra URL có đầy đủ protocol (https://)
- Kiểm tra domain có accessible từ internet
- Với local dev, dùng ngrok

### Lỗi: Order không update status

**Nguyên nhân:** Không connect được database hoặc orderNumber không khớp

**Giải pháp:**
- Kiểm tra `MONGODB_URI` đúng
- Kiểm tra orderNumber trong callback có tồn tại trong DB
- Xem logs trong Vercel Functions

## 📚 Tài liệu tham khảo

- [VNPay Documentation](https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/)
- [VNPay Sandbox](https://sandbox.vnpayment.vn/)

## ✅ Checklist Deploy

- [ ] Code đã push lên GitHub
- [ ] Environment variables đã config trên Vercel
- [ ] `VNPAY_RETURN_URL` dùng domain Vercel
- [ ] Test thanh toán với thẻ test
- [ ] Kiểm tra order status update sau thanh toán
- [ ] Kiểm tra redirect đến success/failed page

## 🎉 Hoàn thành!

VNPay đã được tích hợp thành công. Khách hàng có thể thanh toán trực tuyến qua VNPay!
