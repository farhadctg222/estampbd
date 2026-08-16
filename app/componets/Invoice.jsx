"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice({ order }) {

  // ✅ PDF FUNCTION (এখানে থাকবে)
 const downloadPDF = async () => {
  const element = document.getElementById("invoice");

  const canvas = await html2canvas(element, {
  backgroundColor: "#ffffff",
  scale: 2,
  useCORS: true,
});

  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("invoice.pdf");
};

  return (
    <div>
      {/* button */}
      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white px-4 py-2 rounded mb-3"
      >
        ⬇ Download PDF
      </button>

      {/* INVOICE AREA */}
     <div
  id="invoice"
  style={{
    background: "#fff",
    color: "#000",
    padding: "20px",
  }}
>
        <h1>Invoice #{order.id}</h1>

        {order.items.map((item, i) => (
          <p key={i}>
            {item.name} - {item.quantity} x {item.price}
          </p>
        ))}

        <h2>Total: ৳ {order.total_price}</h2>
      </div>
    </div>
  );
}