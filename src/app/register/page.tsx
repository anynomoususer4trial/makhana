"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {

  return (

    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4 py-10">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">

        {/* REGISTER FORM */}

        <div className="order-1 md:order-2 flex justify-center">

          <RegisterForm />

        </div>

        {/* PRODUCT IMAGE */}

        <div className="order-2 md:order-1 flex justify-center">

          <img
            src="/makhana-premium1.png"
            className="w-full max-w-md md:max-w-lg h-[240px] md:h-[420px] object-cover rounded-3xl shadow-xl"
          />

        </div>

      </div>

    </div>

  );

}