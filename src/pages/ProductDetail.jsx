import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lenis from 'lenis';

export default function ProductDetail() {
  const { id } = useParams();
  
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // 1. Inisialisasi Lenis Khusus Halaman Ini
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  // 2. Fungsi Toggle dengan Freeze Scroll
  const toggleSizeGuide = (open) => {
    setIsSizeGuideOpen(open);
    if (open) {
      lenisRef.current?.stop(); // Bekukan scroll latar
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start(); // Aktifkan kembali
      document.body.style.overflow = 'auto';
    }
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const productImages = [
    `/tas1.png`,
    `/tas2.png`,
  ];

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <Link to="/tas" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black mb-8 inline-block">
          ← Kembali ke Koleksi Tas
        </Link>
        
        {/* GRID 2 KOLOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          
          {/* ================= KOLOM KIRI: GAMBAR ================= */}
          <div className="flex flex-col gap-10 md:gap-0 pb-24">
            {productImages.map((img, index) => (
              <div key={index} className="w-full aspect-[4/5] bg-[#f4f4f4] rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-8">
                <img
                  src={img}
                  alt={`Detail Produk ${index + 1}`}
                  className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-105"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            ))}
          </div>

          {/* ================= KOLOM KANAN: TEKS ================= */}
          <div className="flex flex-col justify-start md:sticky md:top-32 pt-4 md:pt-12">
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs tracking-widest text-gray-500 uppercase">{id || "1AL18K"}</span>
              <button className="text-gray-400 hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-light mb-2">Tas Tangan Songket Premium</h1>
            <p className="text-base text-gray-800 mb-8">IDR 2.500.000</p>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex justify-between items-center cursor-pointer">
                <span className="text-sm">Ukuran</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">All Size</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* TOMBOL PANDUAN UKURAN (Ubah pemanggilan fungsinya) */}
            <button 
              onClick={() => toggleSizeGuide(true)}
              className="text-sm underline underline-offset-4 text-left w-max mb-8 hover:text-gray-500"
            >
              Panduan ukuran
            </button>

            <button className="w-full bg-black text-white py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mb-6">
              Hubungi Concierge Services
            </button>

            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              Hubungi Digital Advisor kami yang tersedia jika ada pertanyaan mengenai produk ini. <a href="#" className="underline underline-offset-2 hover:text-black">Hubungi kami</a>.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Tas tangan eksklusif dengan detail tenun songket Pandai Sikek asli. 
              Dibuat dengan benang emas murni dan lapisan kulit sapi premium...
            </p>
            <button className="text-sm underline underline-offset-4 text-left w-max mb-8 hover:text-gray-500">
              Baca lebih lanjut
            </button>

            <div className="border-t border-gray-200">
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex justify-between items-center py-5 text-sm hover:text-gray-500 transition-colors"
                >
                  Product care
                  <span className="text-xl font-light">{openAccordion === 'care' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed">
                    Hindari kontak langsung dengan air dan bahan kimia. Simpan di dalam dust bag.
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleAccordion('store')}
                  className="w-full flex justify-between items-center py-5 text-sm hover:text-gray-500 transition-colors"
                >
                  Lihat ketersediaan di butik
                  <span className="text-xl font-light">{openAccordion === 'store' ? '−' : '+'}</span>
                </button>
                {openAccordion === 'store' && (
                  <div className="pb-5 text-sm text-gray-600 leading-relaxed">
                    Temukan produk ini di butik bersama client advisor.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= PANEL PANDUAN UKURAN (Slide-over) ================= */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isSizeGuideOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => toggleSizeGuide(false)} // Ubah pemanggilan fungsi
      ></div>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSizeGuideOpen ? 'translate-x-0' : 'translate-x-full'} p-8 overflow-y-auto`}
      >
        <button 
          onClick={() => toggleSizeGuide(false)} // Ubah pemanggilan fungsi
          className="absolute top-6 right-6 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg tracking-widest uppercase mb-8 mt-4">Panduan Ukuran</h2>

        <div className="space-y-4 mb-8">
          <div className="border border-gray-300 rounded-sm p-4 flex justify-between items-center cursor-pointer hover:border-gray-400">
            <span className="text-sm">Tipe Produk</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <div className="border border-gray-300 rounded-sm p-4 flex justify-between items-center cursor-pointer hover:border-gray-400">
            <span className="text-sm">TAS TANGAN - (25 x 15 x 8 CM)</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        <div className="border border-gray-300 text-center mb-10">
          <div className="bg-gray-100 py-3 text-sm font-medium border-b border-gray-300">
            Pengukuran (cm)
          </div>
          <div className="grid grid-cols-4 bg-gray-100 py-2 text-xs font-semibold border-b border-gray-300">
            <div>PANJANG</div>
            <div>LEBAR</div>
            <div>TINGGI</div>
            <div>TALI</div>
          </div>
          <div className="grid grid-cols-4 py-3 text-sm text-gray-600">
            <div>25</div>
            <div>8</div>
            <div>15</div>
            <div>120</div>
          </div>
        </div>

        <h3 className="text-base tracking-widest uppercase mb-4">Cara Mengukur</h3>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Agar dapat memilih tas dengan ukuran yang tepat, kami menyarankan Anda untuk mengukur tas lama Anda atau membandingkannya dengan ukuran yang tertera.
        </p>

        <div className="w-full flex justify-center bg-gray-50 p-8 rounded-lg">
          <div className="relative w-64 h-48 border-2 border-gray-800 rounded-b-xl flex items-center justify-center">
            <div className="absolute -top-16 w-32 h-16 border-t-2 border-l-2 border-r-2 border-gray-800 rounded-t-full"></div>
            
            <div className="absolute -bottom-6 left-0 w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-4 h-[1px] bg-gray-500"></span>
              1. Panjang
              <span className="w-4 h-[1px] bg-gray-500"></span>
            </div>

            <div className="absolute top-1/2 -right-8 -translate-y-1/2 flex flex-col items-center gap-1 text-xs font-bold text-gray-500">
              <span className="h-4 w-[1px] bg-gray-500"></span>
              2. Lebar
              <span className="h-4 w-[1px] bg-gray-500"></span>
            </div>

            <div className="absolute top-0 -left-8 h-full flex flex-col items-center justify-center gap-1 text-xs font-bold text-gray-500">
               <span className="h-4 w-[1px] bg-gray-500"></span>
               3. Tinggi
               <span className="h-4 w-[1px] bg-gray-500"></span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}