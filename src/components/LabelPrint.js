export const printLabel = (product, quantity = 1) => {
  const printWindow = window.open('', '_blank');
  
  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const halalLogo = "https://tse1.mm.bing.net/th/id/OIP.G-5DPk31fcmQmUyWZ0_nQwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3";
  const waLink = "https://shorturl.at/70Jn1";
  const qrPlaceholder = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(waLink)}`;

  let labelsHTML = '';
  for (let i = 0; i < quantity; i++) {
    labelsHTML += `
      <div class="label-wrapper">
        <div class="print-container relative overflow-hidden bg-white">
          
          <div class="absolute top-0 right-0 w-[100px] h-[100px] pointer-events-none overflow-hidden z-50">
            <div class="bg-black text-white text-[7px] font-bold py-1 w-[150px] text-center absolute top-4 -right-10 rotate-45 shadow-sm">
              100% ALAMI
            </div>
          </div>

          <div class="text-center mb-4 px-4">
            <div class="flex items-center justify-center gap-2">
              <h1 class="text-2xl font-black uppercase tracking-tighter border-b-2 inline-block">${product.name}</h1>
            </div>
            <p class="text-[7px] font-bold tracking-[0.3em] uppercase text-slate-500 mt-1 italic">— Premium Homemade Snack —</p>
          </div>

          <div class="grid grid-cols-3 gap-0 mb-4 border-y-2 border-black py-2">
            <div class="text-center border-r border-slate-300">
              <p class="text-[6px] uppercase font-bold text-slate-400 mb-0.5">Netto</p>
              <p class="text-[10px] font-black italic">${product.weight ? product.weight + 'g' : '.......... g'}</p>
            </div>
            <div class="text-center border-r border-slate-300">
              <p class="text-[6px] uppercase font-bold text-slate-400 mb-0.5">Produksi</p>
              <p class="text-[10px] font-bold">${today}</p>
            </div>
            <div class="text-center">
              <p class="text-[6px] uppercase font-bold text-slate-400 mb-0.5">Exp Date</p>
              <p class="text-[10px] font-black text-red-600">${product.expiry || '..........'}</p>
            </div>
          </div>

          <div class="flex gap-3 mb-4 items-start">
            <div class="flex-1">
              <h4 class="text-[8px] font-black uppercase mb-0.5 tracking-wider">Komposisi:</h4>
              <p class="text-[9px] leading-snug text-slate-700 italic">
                Bahan baku pilihan, bumbu rempah asli Nusantara, minyak nabati berkualitas, tanpa bahan pengawet.
              </p>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0">
              <div class="w-12 h-12 border border-slate-200 p-0.5 bg-white">
                <img src="${qrPlaceholder}" alt="QR WA" class="w-full h-full" />
              </div>
              <p class="text-[5px] font-bold uppercase text-slate-400">Order Online</p>
            </div>
          </div>

          <div class="flex justify-between items-end pt-2 border-t border-slate-300">
            <div class="text-[8px] leading-tight">
              <p class="font-bold uppercase text-[6px] mb-0.5 text-slate-400">Diproduksi Oleh:</p>
              <p class="font-black text-black leading-none text-[9px]">MakTika</p>
              <p class="text-slate-500 text-[7px]">Gempol, Jakarta Timur</p>
            </div>
            <div class="flex flex-col items-center">
               <img src="${halalLogo}" alt="Halal" class="w-7 h-auto mb-0.5" />
               <p class="text-[5px] font-bold tracking-tighter text-slate-400 uppercase">Halal</p>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Label MakTika - ${product.name}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
          body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 10px; background: #f0f0f0; }
          .label-wrapper { display: inline-block; padding: 5px; border: 1px dashed #ccc; margin: 5px; background: white; page-break-inside: avoid; }
          .print-container { width: 8.5cm; min-height: 5.5cm; background: white; border: 2px solid black; padding: 15px; position: relative; }
          @media print {
            body { background: white; padding: 0; }
            .label-wrapper { border: 0.5px dashed #999; margin: 2px; }
            @page { size: auto; margin: 5mm; }
          }
        </style>
      </head>
      <body>
        <div class="flex flex-wrap justify-center">${labelsHTML}</div>
        <script>
          window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 800); };
        </script>
      </body>
    </html>
  `);
};