"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultContent() {
  const params = useSearchParams();

  const result = params.get("result");

  const shareResult = async () => {
    try {
      await navigator.share({
        title: "Kalkulator Premium™",
        text: `Aku bayar Rp2.000 buat lihat hasil ${result} 😭`,
        url: window.location.origin,
      });
    } catch {}
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-5">
      <div className="text-center max-w-md">

        <div className="text-7xl mb-4">
          🎉
        </div>

        <h1 className="text-4xl font-black mb-4">
          HASIL ASLI
        </h1>

        <p className="text-zinc-400 mb-6">
          Selamat.
          <br />
          Sekarang kamu tau jawabannya.
        </p>

        <div className="text-7xl font-black text-green-400 mb-6">
          {result}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300">
          Terima kasih telah mendukung industri kalkulator Indonesia 🇮🇩
        </div>

        <button
          onClick={shareResult}
          className="w-full mt-5 bg-white text-black py-4 rounded-2xl font-black"
        >
          📤 Sebarkan ke Korban Berikutnya
        </button>

      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}