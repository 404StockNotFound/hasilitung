"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}

export default function Home() {
    const router = useRouter();
  const [display, setDisplay] = useState("0");
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [fakeResult, setFakeResult] = useState("****");
  const [realResult, setRealResult] = useState("");

  const shareWebsite = async () => {
  try {
    await navigator.share({
      title: "Kalkulator Premium™",
      text: "Menghitung itu gratis. Tau hasilnya beda cerita.",
      url: window.location.href,
    });
  } catch (err) {
    console.log("Share dibatalkan");
  }
};

  const loadingSteps = [
"Menghubungi guru matematika...",
  "Guru tidak mengangkat...",
  "Menghubungi guru lain...",
  "Guru ditemukan...",
  "Guru meminta kalkulator...",
  "Guru sedang menghitung...",
  "Kalkulator lowbat...",
  "Mengganti baterai kalkulator...",
  "Menghitung ulang karena salah pencet...",
  "Hasil ditemukan!"
];

  const press = (value: string) => {
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const clear = () => {
    setDisplay("0");
  };

 const calculate = async () => {
  setLoading(true);

  for (const step of loadingSteps) {
    setLoadingText(step);
    await new Promise((resolve) => setTimeout(resolve, 800));
  }

  try {
    const expression = display
  .replace(/×/g, "*")
  .replace(/÷/g, "/");

const result = Function(
  `"use strict"; return (${expression})`
)();


const resultStr = String(result);
setRealResult(String(result));

    if (resultStr.length <= 2) {
      setFakeResult(resultStr[0] + "*");
    } else {
      setFakeResult(
        resultStr.substring(0, 2) +
          "*".repeat(resultStr.length - 2)
      );
    }
  } catch {
    setFakeResult("ERR*");
  }

  setLoading(false);
  setShowPaywall(true);
};

  const [loadingText, setLoadingText] = useState("");

  const handlePayment = async () => {
  try {
    const res = await fetch("/api/create-transaction");

    const data = await res.json();

    console.log(data);

  window.snap.pay(data.token, {
  onSuccess: function () {
    router.push(
      `/result?result=${encodeURIComponent(realResult)}`
    );
  },

  onPending: function (result: any) {
    console.log("Pending", result);
  },

  onError: function (result: any) {
    console.log("Error", result);
  },

  onClose: function () {
    console.log("Popup ditutup");
  },
});
  } catch (err) {
    console.error(err);
  }
  };
  const buttons = [
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
<main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 flex items-center justify-center p-3 overflow-y-auto">      <div className="w-full max-w-[300px]">

        <h1 className="text-white text-center text-4xl font-black mb-1 tracking-tight">
          Kalkulator Premium
        </h1>

        <p className="text-center text-zinc-400 text-sm mb-5">
          Menghitung itu gratis.
        </p>

        <div className="bg-zinc-900/80 backdrop-blur-xl rounded-[32px] p-4 border border-zinc-800 shadow-[0_0_60px_rgba(255,255,255,0.05)]">

          <div className="bg-black border border-zinc-800 rounded-3xl p-4 mb-3 shadow-inner">
<div className="text-right text-white text-4xl font-bold overflow-hidden truncate">              {display}
            </div>
          </div>

          <button
            onClick={clear}
className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-2xl mb-3 font-bold">
            HAPUS DOSA
          </button>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === "=") {
                    calculate();
                  } else {
                    press(btn);
                  }
                }}
className={`h-12 rounded-2xl font-bold text-lg transition active:scale-95                  ${
                    ["+", "-", "×", "÷", "="].includes(btn)
                      ? "bg-gradient-to-b from-orange-400 to-orange-600 text-white"
                      : "bg-zinc-800 text-white"
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>
      <div className="mt-5 space-y-3">

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
    <div className="text-yellow-400">
      ⭐⭐⭐⭐⭐
    </div>

    <p className="text-zinc-300 text-xs mt-1">
      "Awalnya iseng. Sekarang saya tau 12×12."
    </p>

    <p className="text-zinc-500 text-[10px] mt-1">
      - Budi, pengguna premium
    </p>
  </div>

  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
    <div className="text-yellow-400">
      ⭐⭐⭐⭐⭐
    </div>

    <p className="text-zinc-300 text-xs mt-1">
      "Saya menyesal penasaran."
    </p>

    <p className="text-zinc-500 text-[10px] mt-1">
      - Anton, korban kalkulator
    </p>
  </div>
  <div className="grid grid-cols-3 gap-2 mt-4">

  <div className="bg-zinc-900 rounded-xl p-3 text-center">
    <div className="text-white font-black">
      1.284
    </div>

    <div className="text-zinc-500 text-[10px]">
      Perhitungan
    </div>
  </div>

  <div className="bg-zinc-900 rounded-xl p-3 text-center">
    <div className="text-white font-black">
      97%
    </div>

    <div className="text-zinc-500 text-[10px]">
      Penasaran
    </div>
  </div>

  <div className="bg-zinc-900 rounded-xl p-3 text-center">
    <div className="text-white font-black">
      Rp14K
    </div>

    <div className="text-zinc-500 text-[10px]">
      Diselamatkan
    </div>
  </div>

</div>

</div>

        
        </div>
      </div>

      {loading && (
  <div className="fixed inset-0 bg-black flex items-center justify-center">
    <div className="text-center px-5">

      <div className="w-16 h-16 border-4 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-6"></div>

      <h2 className="text-white text-2xl font-black">
        {loadingText}
      </h2>

      <p className="text-zinc-400 mt-4">
        Mohon tunggu...
      </p>

    </div>
  </div>
)}

  {showPaywall && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm overflow-y-auto">
    <div className="min-h-screen flex items-start justify-center px-4 py-6">

      <div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-6 max-w-sm w-full text-white animate-[popup_0.25s_ease-out]">

        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🎉</div>

          <h2 className="text-2xl sm:text-3xl font-black">
            Hasil Sudah Ketemu
          </h2>
        </div>

        <div className="bg-black border border-zinc-800 rounded-3xl p-5 text-center mb-4">

          <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
            Hasil
          </div>

          <div className="text-4xl sm:text-5xl font-black">
            {fakeResult}
          </div>

        </div>

        <p className="text-zinc-300 text-center mb-4 leading-relaxed">
          Kami tahu hasilnya.
          <br />
          Kamu belum.
          <br />
          Dan itu masalahmu.
          <br />
          <br />
          ⚠️ Hasil akan tetap menjadi misteri jika Anda menutup halaman ini.
        </p>

        <div className="text-center mb-5">
          <div className="text-zinc-500 text-sm">
            Buka rasa penasaran
          </div>

          <div className="text-4xl sm:text-5xl font-black mt-2">
            Rp2.000
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg"
        >
          BUKA HASIL SEKARANG
        </button>

        <button
          onClick={() => setShowPaywall(false)}
          className="w-full mt-3 border border-zinc-800 py-4 rounded-2xl text-zinc-400"
        >
          Aku ikhlas bodoh
        </button>

        <button
          onClick={shareWebsite}
          className="w-full mt-3 bg-zinc-800 py-4 rounded-2xl text-white font-bold"
        >
          📤 Kirim ke Teman
        </button>

        <p className="text-center text-zinc-500 text-xs mt-3">
          Kirim ke teman yang terlalu sering pakai kalkulator.
        </p>

      </div>

    </div>
  </div>
)}
    </main>
  );
}