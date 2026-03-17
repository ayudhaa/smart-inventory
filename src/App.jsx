import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, Plus, Sun, Moon, Search, X, 
  AlertCircle, ShoppingCart, History, Printer 
} from 'lucide-react';
import { Notify, Confirm } from 'notiflix';
import { printLabel } from './components/LabelPrint';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('snack_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  const [salesLog, setSalesLog] = useState(() => {
    const savedSales = localStorage.getItem('snack_sales_log');
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const [form, setForm] = useState({ name: '', stock: '', minStock: '', expiry: '' });

  useEffect(() => {
    localStorage.setItem('snack_inventory', JSON.stringify(products));
    localStorage.setItem('snack_sales_log', JSON.stringify(salesLog));
  }, [products, salesLog]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, products]);

  const todaySales = useMemo(() => {
    const today = new Date().toLocaleDateString('id-ID');
    return salesLog.filter(log => log.date === today).reduce((acc, curr) => acc + curr.qty, 0);
  }, [salesLog]);

  const updateStock = (id, amount) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStock = p.stock + amount;
        if (newStock < 0) return p;
        if (amount < 0) {
          const today = new Date().toLocaleDateString('id-ID');
          setSalesLog([{ id: Date.now(), name: p.name, qty: 1, date: today }, ...salesLog]);
        }
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-500 pb-20">
      
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/30">
              <Package size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight dark:text-white">Snack<span className="text-blue-600">Log</span></span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all"
          >
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-6 md:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-500/20">
            <div className="relative z-10">
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Terjual Hari Ini</p>
              <h2 className="text-4xl font-black mt-1">{todaySales} <small className="text-lg font-medium opacity-70">Pcs</small></h2>
            </div>
            <ShoppingCart size={80} className="absolute -right-4 -bottom-4 opacity-10 rotate-12" />
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Stok Menipis</p>
              <h2 className="text-4xl font-black mt-1 text-red-500">
                {products.filter(p => p.stock <= p.minStock).length}
              </h2>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl">
              <AlertCircle size={32} className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[350px] shrink-0 order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-bold mb-5 dark:text-white flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div> Input Stok
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const newProduct = { ...form, id: Date.now(), stock: Number(form.stock), minStock: Number(form.minStock) };
                setProducts([newProduct, ...products]);
                setForm({ name: '', stock: '', minStock: '', expiry: '' });
                Notify.success('Produk berhasil ditambah');
              }} className="space-y-4">
                <input type="text" placeholder="Nama nya" required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-transparent focus:bg-white focus:ring-2 ring-blue-500 dark:text-white transition-all outline-none"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Stok" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-transparent focus:bg-white focus:ring-2 ring-blue-500 dark:text-white outline-none"
                    value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                  <input type="number" placeholder="Limit" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-transparent focus:bg-white focus:ring-2 ring-blue-500 dark:text-white outline-none"
                    value={form.minStock} onChange={e => setForm({...form, minStock: e.target.value})} />
                </div>
                <button className="w-full bg-slate-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                  Tambah Produk
                </button>
              </form>
            </div>
          </div>

          <div className="flex-1 space-y-4 order-1 lg:order-2">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input type="text" placeholder="Cari stok..." className="w-full pl-12 pr-4 py-4 rounded-[1.5rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white shadow-sm outline-none focus:ring-2 ring-blue-500 transition-all"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="space-y-4">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-800 p-4 rounded-[1.8rem] border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all hover:shadow-md">
                  <div className="flex gap-4 items-center w-full">
                    <div className={`p-4 rounded-2xl ${p.stock <= p.minStock ? 'bg-red-50 text-red-500 dark:bg-red-900/20' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'}`}>
                      <Package size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold dark:text-white text-lg">{p.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <button onClick={() => updateStock(p.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 dark:text-white hover:bg-red-500 hover:text-white transition-all font-black text-lg">-</button>
                        <span className={`text-xl font-mono font-bold w-6 text-center ${p.stock <= p.minStock ? 'text-red-500 font-black scale-110' : 'dark:text-white'}`}>{p.stock}</span>
                        <button onClick={() => updateStock(p.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 dark:text-white hover:bg-green-500 hover:text-white transition-all font-black text-lg">+</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        const qty = window.prompt(`Banyaknya label untuk ${p.name}:`, "1");
                        if (qty !== null && !isNaN(qty)) {
                          printLabel(p, parseInt(qty));
                          Notify.info(`Menyiapkan ${qty} label...`);
                        }
                      }} 
                      className="flex-1 sm:flex-none px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Printer size={18} /> Cetak
                    </button>
                    <button onClick={() => Confirm.show('Hapus', 'Hapus produk ini?', 'Ya', 'Tidak', () => setProducts(products.filter(i => i.id !== p.id)))} 
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                      <X size={24}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <footer className="w-full py-8 mt-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-medium text-sm">
            made with❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;