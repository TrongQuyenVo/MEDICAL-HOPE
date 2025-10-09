export default function BankCheckout({ bankInfo, donationId, donorName }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 space-y-3">
      <h2 className="text-xl font-bold mb-2">Thanh toán chuyển khoản</h2>
      <p>Số tiền: <b>{bankInfo.amount.toLocaleString("vi-VN")} VNĐ</b></p>
      <p>Ngân hàng: <b>{bankInfo.bankName}</b></p>
      <p>Số tài khoản: <b>{bankInfo.accountNumber}</b></p>
      <p>Chủ tài khoản: <b>{bankInfo.accountHolder}</b></p>
      <p>
        Nội dung: <b>{donationId} - {donorName}</b>
      </p>

      {/* QR Code */}
      {bankInfo.qrCodeUrl && (
        <div className="flex justify-center mt-4">
          <img
            src={bankInfo.qrCodeUrl}
            alt="QR Code"
            className="w-48 h-48 border rounded"
          />
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Vui lòng chuyển khoản chính xác nội dung để hệ thống tự động xác nhận.
      </p>
    </div>
  );
}
