"use client";

import { AlertCircle, ArrowRight, BadgeCheck, Receipt } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();

  const transactionId = params.get("transactionId") || "---";
  const message = params.get("message") || "Payment Completed Successfully";
  const amount = params.get("amount") || "0";
  const status = params.get("status") || "success";

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-10">
      
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          {isSuccess ? (
            <BadgeCheck className="w-20 h-20 text-green-600 animate-scaleIn" />
          ) : (
            <AlertCircle className="w-20 h-20 text-red-600" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isSuccess ? "Payment Successful 🎉" : "Payment Failed"}
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Transaction Details */}
        <div className="bg-gray-50 p-4 rounded-xl text-left text-gray-700 space-y-2 border">
          <div className="flex justify-between">
            <span className="font-semibold">Transaction ID:</span>
            <span className="text-gray-900">{transactionId}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Amount Paid:</span>
            <span className="text-green-600 font-bold">${amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span
              className={`font-bold ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="w-full bg-green-600 text-white py-3 px-5 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <ArrowRight size={18} />
            Go to Home
          </Link>

          <Link
            href="/bookings"
            className="w-full border border-gray-300 py-3 px-5 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <Receipt size={18} />
            View My Bookings
          </Link>
        </div>
      </div>

      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
