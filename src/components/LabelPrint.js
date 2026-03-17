export const printLabel = (product, quantity = 1) => {
  const printWindow = window.open('', '_blank');
  
  const today = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const halalLogo = "https://tse1.mm.bing.net/th/id/OIP.G-5DPk31fcmQmUyWZ0_nQwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3";

  let labelsHTML = '';
  for (let i = 0; i < quantity; i++) {
    labelsHTML += `
      <div class="label-wrapper">
        <div class="print-container">
          <div class="text-center border-b-2 border-black pb-2 mb-3">
            <h1 class="text-xl font-black uppercase leading-tight">${product.name}</h1>
            <p class="text-[8px] font-bold tracking-[0.15em] uppercase text-slate-600">Premium Homemade Snack</p>
          </div>
          <div class="mb-4">            
            <div class="flex justify-between items-end border-b border-slate-300 pb-1">
              <span class="text-[9px] uppercase font-bold text-slate-500">Tgl Produksi</span>
              <span class="text-[11px] font-semibold">${today}</span>
            </div>
            <div class="flex justify-between items-end border-b-2 border-black pb-1 mt-1">
              <span class="text-[9px] uppercase font-black italic">Baik Digunakan Sebelum</span>
              <span class="text-[11px] font-black text-red-600">${product.expiry || '---'}</span>
            </div>
          </div>
          <div class="mb-4 text-[9px] leading-snug italic text-slate-800">
            <h4 class="text-[8px] font-black uppercase mb-0.5 not-italic">Komposisi:</h4>
            Bahan baku pilihan, bumbu rempah alami, minyak nabati, tanpa pengawet.
          </div>
          <div class="flex justify-between items-center pt-2 border-t border-slate-300">
            <div class="text-[9px] leading-tight flex-1 pr-2">
              <p class="font-bold uppercase text-[7px]">Diproduksi Oleh:</p>
              <p class="font-bold text-slate-700 leading-none">MakTika, Gempol - Jakarta Timur</p>
            </div>
            <img src="${halalLogo}" alt="Halal" class="w-8 h-auto" />
          </div>
        </div>
      </div>
    `;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Cetak Massal - ${product.name}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
          body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 10px; background: #f0f0f0; }
          
          /* Wrapper untuk garis gunting */
          .label-wrapper {
            display: inline-block;
            padding: 5px;
            border: 1px dashed #ccc; /* Garis putus-putus untuk gunting */
            margin: 5px;
            background: white;
            page-break-inside: avoid;
          }

          .print-container {
            width: 8.5cm;
            background: white;
            border: 2px solid black;
            padding: 15px;
          }

          @media print {
            body { background: white; padding: 0; }
            .label-wrapper { 
              border: 0.5px dashed #999; /* Garis lebih halus saat diprint */
              margin: 2px; 
            }
            @page { size: auto; margin: 5mm; }
          }
        </style>
      </head>
      <body>
        <div class="flex flex-wrap justify-center font-sans">
          ${labelsHTML}
        </div>
        <script>
          window.onload = () => {
            setTimeout(() => { window.print(); window.close(); }, 800);
          };
        </script>
      </body>
    </html>
  `);
};