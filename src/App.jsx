import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lenis from 'lenis';
import CatalogTas from './pages/CatalogTas';
import ProductDetail from './pages/ProductDetail';

// --- KOMPONEN HALAMAN UTAMA (HOME) ---
function Home() {
  return (
    <main>
      <section className="relative w-full h-[85vh] bg-[#f4f4f4] overflow-hidden">
        <img 
          src="/model2.png" 
          alt="Koleksi Utama Meri Songket" 
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute bottom-20 left-0 w-full text-center z-10 px-4">
          <p className="text-black text-xs tracking-[0.2em] font-semibold mb-3 uppercase">Songket Pandai Sikek</p>
          <h1 className="text-black text-3xl md:text-5xl tracking-[0.05em] font-medium mb-6 drop-shadow-lg font-sans">
            Pembuatan Dengan Cara Tradisional
          </h1>
          <Link to="/tas" className="inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors duration-300">
            Lihat Selengkapnya
          </Link>
        </div>
      </section>

      <section className="relative w-full h-[70vh] bg-[#1a1a1a] overflow-hidden my-10">
        <img 
          src="/tas1.png" 
          alt="Koleksi Baju" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute bottom-20 left-0 w-full text-center z-10 px-4">
          <p className="text-white text-xs tracking-[0.2em] font-semibold mb-3 uppercase">Tas & Aksesori</p>
          <h2 className="text-white text-2xl md:text-4xl tracking-[0.05em] mb-6 font-sans">OUTER & SALENDANG EKSKLUSIF</h2>
          <a href="#" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors">Lihat Koleksi</a>
        </div>
      </section>

      <section className="relative w-full h-[70vh] bg-[#000000] overflow-hidden my-10">
        <img 
          src="/hero-secondary.jpg" 
          alt="Koleksi Tas & Aksesori" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute bottom-20 left-0 w-full text-center z-10 px-4">
          <p className="text-white text-xs tracking-[0.2em] font-semibold mb-3 uppercase">Tas & Aksesori</p>
          <h2 className="text-white text-2xl md:text-4xl tracking-[0.05em] mb-6 font-sans">TAS & AKSESORI EKSKLUSIF</h2>
          <Link to="/tas" className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors">Lihat Koleksi</Link>
        </div>
      </section>
    </main>
  );
}

// --- KOMPONEN UTAMA ---
export default function App() {
  // State untuk Panel Hubungi Kami
  const [isContactOpen, setIsContactOpen] = useState(false);
  // State untuk Panel Akun
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  // Ref untuk menyimpan instance Lenis
  const lenisRef = useRef(null);

  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  // Fungsi untuk membuka/menutup Panel Hubungi Kami (dengan freeze scroll)
  const toggleContact = (open) => {
    setIsContactOpen(open);
    if (open) {
      lenisRef.current?.stop(); // Bekukan scroll
      document.body.style.overflow = 'hidden'; // Mencegah scroll bawaan browser
    } else {
      lenisRef.current?.start(); // Aktifkan scroll
      document.body.style.overflow = 'auto';
    }
  };

  // Fungsi untuk membuka/menutup Panel Akun (dengan freeze scroll)
  const toggleAccount = (open) => {
    setIsAccountOpen(open);
    if (open) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
        
        {/* ================= HEADER ================= */}
        <header className="fixed top-0 w-full bg-white z-40 border-b border-gray-200">
          <div className="relative flex justify-between items-center px-6 md:px-12 py-5">
            <div className="flex gap-6 text-xs tracking-widest font-medium uppercase cursor-pointer">
              <span className="hover:underline">Cari</span>
            </div>
            
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-3xl md:text-4xl tracking-[0.2em] uppercase font-semibold">
              Meri Songket
            </Link>

            <div className="flex gap-6 text-xs tracking-widest font-medium uppercase cursor-pointer items-center">
              {/* TOMBOL HUBUNGI KAMI */}
              <button 
                onClick={() => toggleContact(true)} 
                className="hover:underline hover:text-gray-500 transition-colors hidden md:block"
              >
                Hubungi Kami
              </button>
              
              {/* TOMBOL AKUN */}
              <button 
                onClick={() => toggleAccount(true)}
                className="hover:underline hidden md:block"
              >
                Akun
              </button>
              
              <span className="hover:underline">Keranjang (0)</span>
            </div>
          </div>

          <nav className="hidden md:flex justify-center gap-8 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <Link to="/tas" className="hover:border-b border-black pb-1">Tas</Link>
            <Link to="/" className="hover:border-b border-black pb-1">Stelan Laki-Laki</Link>
            <Link to="/" className="hover:border-b border-black pb-1">Stelan Perempuan</Link>
            <Link to="/" className="hover:border-b border-black pb-1">Kemeja</Link>
            <Link to="/" className="hover:border-b border-black pb-1">Outer</Link>
            <Link to="/" className="hover:border-b border-black pb-1">Tentang Kami</Link>
          </nav>
        </header>

        {/* Spacer Header */}
        <div className="h-[110px] md:h-[130px]"></div>

        {/* ================= ROUTES ================= */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tas" element={<CatalogTas />} />
          <Route path="/produk/:id" element={<ProductDetail />} />
        </Routes>

        {/* ================= FOOTER ================= */}
        <footer className="w-full">
          <div className="bg-white px-6 md:px-12 py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Layanan Pelanggan</h3>
                <p className="text-sm text-gray-600 mb-2">WhatsApp & Telepon</p>
                <p className="text-sm text-gray-600 mb-4">+62 812 3456 7890</p>
                <p className="text-sm text-gray-600 mb-2">Email</p>
                <p className="text-sm text-gray-600">halo@merisongket.com</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Temukan Butik</h3>
                <p className="text-sm text-gray-600 mb-4">Kunjungi galeri kami di Pandai Sikek, Sumatera Barat.</p>
                <div className="flex border-b border-black pb-2">
                  <input type="text" placeholder="Kota atau kode pos" className="w-full outline-none text-sm placeholder-gray-400" />
                  <button className="text-lg">🔍</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black text-white px-6 md:px-12 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">Jelajahi Meri Songket</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><Link to="/tas" className="hover:text-white transition-colors">Tas</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Baju</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Outer</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Salendang</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">Layanan Online</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Panduan Ukuran</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Perawatan Songket</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">Tentang Kami</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Kisah Meri Songket</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pengrajin Kami</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Keberlanjutan</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-6">Ikuti Kami</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                </ul>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <p>© 2026 Meri Songket. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Kebijakan Privasi</a>
                <a href="#" className="hover:text-white">Syarat & Ketentuan</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ================= PANEL HUBUNGI KAMI (Slide-over) ================= */}
        {/* ================= PANEL HUBUNGI KAMI ================= */}
        <div 
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isContactOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => toggleContact(false)}
        ></div>
        <div 
          className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isContactOpen ? 'translate-x-0' : 'translate-x-full'} p-8 overflow-y-auto overscroll-contain`}
        >
          {/* Konten Hubungi Kami... */}
        </div>

        {/* ================= PANEL AKUN ================= */}
        <div 
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isAccountOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => toggleAccount(false)}
        ></div>
        
        <div 
          className={`fixed top-0 right-0 h-screen w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isAccountOpen ? 'translate-x-0' : 'translate-x-full'} p-8 md:p-12 overflow-y-auto overscroll-contain`}
        >
          {/* Konten Akun... */}
        </div>
        <div 
          className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isContactOpen ? 'translate-x-0' : 'translate-x-full'} p-8 overflow-y-auto`}
        >
          <button onClick={() => toggleContact(false)} className="absolute top-6 right-6 text-gray-500 hover:text-black text-xl">✕</button>
          <h2 className="text-2xl font-serif mb-6 mt-4">Hubungi Kami</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">Di mana pun Anda berada, Penasihat Klien Meri Songket akan dengan senang hati menawarkan panduan khusus untuk Anda.</p>
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-4"><span className="text-lg">📞</span><a href="tel:+6281234567890" className="hover:underline">+62 812 3456 7890</a></div>
            <div className="flex items-center gap-4"><span className="text-lg">✉️</span><a href="mailto:halo@merisongket.com" className="hover:underline">Email</a></div>
            <div className="flex items-center gap-4"><span className="text-lg">💬</span><a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp</a></div>
          </div>
        </div>

        {/* ================= PANEL AKUN (Slide-over) ================= */}
        <div 
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isAccountOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => toggleAccount(false)}
        ></div>
        
        <div 
          className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isAccountOpen ? 'translate-x-0' : 'translate-x-full'} p-8 md:p-12 overflow-y-auto`}
        >
          <button 
            onClick={() => toggleAccount(false)} 
            className="absolute top-6 right-6 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-light mb-10 mt-4">Akun Saya</h2>

          <h3 className="text-base mb-6">Saya sudah memiliki akun</h3>
          
          <div className="flex flex-col gap-3 mb-8">
            <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <span className="text-lg">G</span> Masuk dengan Google
            </button>
            <button className="w-full border border-gray-300 rounded-full py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <span className="text-lg"></span> Masuk dengan akun Apple
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Atau</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          <form className="space-y-6 mb-12" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm mb-2">Masuk akun*</label>
              <input type="text" className="w-full border border-gray-300 rounded-sm p-3 outline-none focus:border-black transition-colors" />
            </div>
            <div>
              <label className="block text-sm mb-2">Kata sandi*</label>
              <div className="relative">
                <input type="password" className="w-full border border-gray-300 rounded-sm p-3 outline-none focus:border-black transition-colors" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">👁️</button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <a href="#" className="underline underline-offset-2 hover:text-gray-600">Lupa kata sandi Anda?</a>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Atau gunakan tautan login saku untuk masuk. <a href="#" className="underline underline-offset-2 hover:text-black">Kirimkan email tautan</a>
            </p>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Masuk
            </button>
          </form>

          <div className="h-[1px] bg-gray-200 w-full mb-12"></div>

          <h3 className="text-base mb-4">Saya tidak memiliki akun</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Nikmati manfaat tambahan dan pengalaman menarik lainnya dengan membuat akun pribadi Anda.
          </p>
          <button className="w-full border border-black text-black py-4 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
            Buat akun Meri Songket
          </button>

        </div>

      </div>
    </Router>
  );
}