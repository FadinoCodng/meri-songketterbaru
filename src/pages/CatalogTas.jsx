import { Link } from 'react-router-dom';

// Data dummy (Nanti bisa diganti dengan database/API)
const products = [
  { id: 1, name: "Tas Tangan Songket Gold", price: 2500000, image: "/tas-1.jpg" },
  { id: 2, name: "Clutch Songket Maroon", price: 1200000, image: "/tas-2.jpg" },
  { id: 3, name: "Tote Bag Songket Classic", price: 3100000, image: "/tas-3.jpg" },
  { id: 4, name: "Sling Bag Songket Elegant", price: 1850000, image: "/tas-4.jpg" },
  { id: 5, name: "Tas Pesta Songket Emas", price: 2750000, image: "/tas-5.jpg" },
  { id: 6, name: "Mini Bag Songket Premium", price: 1500000, image: "/tas-6.jpg" },
];

export default function CatalogTas() {
  // Fungsi format Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12">
      {/* Header Katalog */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.1em] mb-4">
          Koleksi Tas
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Tas tangan mewah yang dibuat dengan tenun songket Pandai Sikek asli. 
          Dilengkapi dengan detail benang emas dan kulit premium.
        </p>
      </div>

      {/* Filter Kategori (Gaya Chanel: Teks Minimalis) */}
      <div className="max-w-7xl mx-auto border-b border-gray-200 pb-4 mb-10 flex justify-center gap-8 text-xs font-semibold tracking-[0.1em] uppercase">
        <button className="text-black border-b-2 border-black pb-4 -mb-[18px]">Semua Tas</button>
        <button className="text-gray-400 hover:text-black transition-colors pb-4">Tas Tangan</button>
        <button className="text-gray-400 hover:text-black transition-colors pb-4">Clutch</button>
        <button className="text-gray-400 hover:text-black transition-colors pb-4">Sling Bag</button>
      </div>

      {/* Grid Produk */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <Link to={`/produk/${product.id}`} key={product.id} className="group cursor-pointer">
            {/* Gambar Produk */}
            <div className="aspect-[3/4] bg-[#f4f4f4] overflow-hidden relative mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => e.target.style.display = 'none'}
              />
              {/* Overlay Hover (Muncul saat mouse diarahkan) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest">
                  Lihat Detail
                </span>
              </div>
            </div>

            {/* Info Produk */}
            <div className="text-left">
              <h3 className="text-sm font-semibold mb-1 text-black">{product.name}</h3>
              <p className="text-gray-500 text-sm">{formatPrice(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}