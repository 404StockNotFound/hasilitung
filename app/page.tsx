"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [loading, setLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [fakeResult, setFakeResult] = useState("****");

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
          <div className="text-center text-zinc-500 text-xs mt-5">
          Dipakai oleh:
          <br />
          • 3 anak SD
          <br />
          • 1 tukang fotokopi
          <br />
          • 17 orang yang salah pencet
          <br />
          • 0 matematikawan
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center px-5">
<div className="bg-zinc-950 border border-zinc-800 rounded-[32px] p-8 max-w-sm w-full text-white animate-[popup_0.25s_ease-out]">
    <div className="text-center mb-5">
      <div className="text-5xl mb-3">🎉</div>

      <h2 className="text-3xl font-black">
        Hasil Sudah Ketemu
      </h2>
    </div>

    <div className="bg-black border border-zinc-800 rounded-3xl p-6 text-center mb-5">

      <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
        Hasil
      </div>

      <div className="text-5xl font-black">
        {fakeResult}
      </div>

    </div>

    <p className="text-zinc-300 text-center mb-4">
      Kami tahu hasilnya.
      <br />
      Kamu belum.
    </p>

    <div className="text-center mb-6">
      <div className="text-zinc-500 text-sm">
        Buka rasa penasaran
      </div>

      <div className="text-5xl font-black mt-2">
        Rp2.000
      </div>
    </div>

    <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg">
      YAUDAH KASIH TAU
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
    <p className="text-center text-zinc-500 text-xs mb-3">
  Kirim ke teman yang terlalu sering pakai kalkulator.
</p>
  </div>
</div>
      )}
    </main>
  );
}