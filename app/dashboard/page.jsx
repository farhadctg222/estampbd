// // /app/dashboard/page.js
// "use client";
// import StatusUpdate from "../componets/StatusUpdate";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [orders, setOrders] = useState([]);
//   console.log(orders)

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token)

//     fetch("/api/orders", {
//       headers: {
//         authorization: token
//       }
//     })
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">Orders</h1>

//       {orders.map(o => (
//         <div key={o.id} className="border p-3 my-2">
//           <p>{o.customer_name}</p>
//           <p>{o.package_name}</p>
//           <p>{o.area_name}</p>
//           <p>Status: {o.status}</p>

//           <StatusUpdate  id={o.id}/>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";

import StatusUpdate from "../componets/StatusUpdate";
import Invoice from "../componets/Invoice";
import { useEffect, useState, useRef } from "react";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
const prevLengthRef = useRef(0);
const audioRef = useRef(null);
const [soundEnabled, setSoundEnabled] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🔊 SOUND FUNCTION
  const playSound = () => {
  if (!soundEnabled || !audioRef.current) return;

  audioRef.current.currentTime = 0;
  audioRef.current.play().catch(() => {});
};

  // ======================
  // 🔥 LOAD ORDERS FUNCTION (MAIN FIX)
  // ======================


  const today = new Date().toISOString().split("T")[0];


const todaySale = orders
.filter(o => 
  o.payment_status === "paid" &&
  o.created_at?.startsWith(today)
)
.reduce(
(sum,o)=> sum + Number(o.total_price),
0
);


const totalSale = orders
.filter(o => o.payment_status === "paid")
.reduce(
(sum,o)=> sum + Number(o.total_price),
0
);


const deliveredOrders = orders.filter(
o=>o.status==="delivered"
).length;



const dueAmount = orders
.filter(o=>o.payment_status!=="paid")
.reduce(
(sum,o)=>sum + Number(o.total_price),
0
);
  const loadOrders = async () => {

 const token = localStorage.getItem("token");


 try {

  const res = await fetch("/api/orders", {

   headers:{
    Authorization:`Bearer ${token}`,
   },

  });


  const data = await res.json();


  if(!res.ok){
    console.log(data);
    setOrders([]);
    return;
  }


  if (Array.isArray(data)) {

  if (audioRef.current === null) {
    audioRef.current = new Audio("/Notification.mp3");
  }

  if (prevLengthRef.current === 0) {
    prevLengthRef.current = data.length;
  }

  if (
    soundEnabled &&
    data.length > prevLengthRef.current
  ) {
    playSound();
  }

  prevLengthRef.current = data.length;

  setOrders(data);
}


 }
 catch(err){
  console.error(err);
 }

};

  // ======================
  // AUTO REFRESH
  // ======================
//   useEffect(() => {
//   loadOrders();

//   const interval = setInterval(loadOrders, 20000);
//   return () => clearInterval(interval);
// }, [soundEnabled]);
// useEffect(() => {
//   const userRole = localStorage.getItem("role");
//   setRole(userRole);

//   loadOrders();

//   const interval = setInterval(loadOrders, 20000);

//   return () => clearInterval(interval);
// }, [soundEnabled]);


useEffect(() => {

 const userRole = localStorage.getItem("role");

 setRole(userRole);

 loadOrders();


 const interval=setInterval(
  loadOrders,
  20000
 );


 return ()=>clearInterval(interval);


},[soundEnabled]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">


      {!soundEnabled && (
  <button
    onClick={() => {
      const audio = new Audio("/Notification.mp3");
      audio.play().then(() => {
        setSoundEnabled(true);
      });
    }}
    className="bg-green-600 text-white px-4 py-2 rounded mb-4"
  >
    🔊 Enable Sound
  </button>
)}

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Orders Dashboard
      </h1>
      <div className="grid md:grid-cols-4 gap-5 mb-8">


<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">
আজকের বিক্রি
</p>

<h2 className="text-3xl font-bold text-green-600">
৳ {todaySale}
</h2>

</div>



<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">
মোট বিক্রি
</p>

<h2 className="text-3xl font-bold text-blue-600">
৳ {totalSale}
</h2>

</div>



<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">
ডেলিভারি সম্পন্ন
</p>

<h2 className="text-3xl font-bold text-purple-600">
{deliveredOrders}
</h2>

</div>



<div className="bg-white p-5 rounded-xl shadow">
<p className="text-gray-500">
বাকি টাকা
</p>

<h2 className="text-3xl font-bold text-red-600">
৳ {dueAmount}
</h2>

</div>


</div>


      {/* ORDERS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No orders found.
          </p>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    {o.customer_name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Order # {o.id}
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {o.created_at
                    ? new Date(o.created_at).toLocaleString()
                    : ""}
                </span>
              </div>

              {/* PHONE */}
              <p className="text-sm text-gray-600">
                📞 {o.phone}
              </p>

              {/* ITEMS */}
              <div className="mt-2 mb-2">
                <strong className="text-sm">Items:</strong>

                {o.items && o.items.length > 0 ? (
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {o.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          • {item.name} ৳ {item.price} (x{item.quantity || 1})
                        </span>
                        <span>
                          ৳ {item.price * (item.quantity || 1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">
                    {o.package_name} (x{o.quantity})
                  </p>
                )}
              </div>

              {/* TOTAL */}
              <p className="text-sm text-gray-600">
                💰 Total: <strong>৳ {o.total_price}</strong>
              </p>

              {/* ADDRESS */}
              <p className="text-sm text-gray-600">
                📍 {o.area_name || ""} - {o.address}
              </p>
              {/* DELIVERY NOTE */}
              {o.delivery_note && (
                <p className="text-sm text-gray-600 mt-1">
                  📝 Note: {o.delivery_note}
                </p>
              )}

              {/* STATUS */}
              <div className="mt-3 mb-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full text-white
                  ${o.status === "pending" && "bg-gray-500"}
                  ${o.status === "confirmed" && "bg-blue-500"}
                  ${o.status === "cooking" && "bg-yellow-500"}
                  ${o.status === "delivered" && "bg-green-600"}
                  ${o.status === "cancelled" && "bg-red-500"}
                `}
                >
                  {o.status?.toUpperCase()}
                </span>
              </div>
              {/* PAYMENT STATUS */}
              
              <div className="mt-3 bg-gray-50 p-3 rounded-lg">

              <p className="text-sm font-semibold">
              💳 Payment Method:
              </p>

              <p className="text-sm text-gray-600">
              {
              o.payment_method === "cash"
              ? "💵 Cash on Delivery"
              : o.payment_method?.toUpperCase()
              }
              </p>


              {o.payment_method !== "cash" && (
              <>
              <p className="text-sm text-gray-600 mt-1">
              📱 Number: {o.payment_number}
              </p>

              <p className="text-sm text-gray-600">
              🔖 Transaction ID: {o.transaction_id}
              </p>
              </>
              )}

              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center">

                {/* 🔥 FIXED: instant update */}
                {/* <StatusUpdate id={o.id} onUpdate={() => loadOrders({ current: orders.length })} /> */}
                    {role === "admin" && (
    <StatusUpdate
      id={o.id}
      onUpdate={() => loadOrders()}
    />
    )}

                <div className="flex flex-wrap gap-2 mt-3">

  <button
    onClick={() => setSelectedOrder(o)}
    className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
  >
    🧾 Invoice
  </button>

  {role === "admin" && (
    <>
      <button
        onClick={() => {
          setEditId(o.id);
          setEditData({
            name: o.customer_name,
            phone: o.phone,
            address: o.address,
          });
        }}
        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
      >
        ✏️ Edit
      </button>

      <button
        onClick={async () => {
          if (!confirm("আপনি কি এই Order Delete করতে চান?")) return;

          const token = localStorage.getItem("token");

          const res = await fetch(`/api/orders/${o.id}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            loadOrders();
          }
        }}
        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
      >
        🗑 Delete
      </button>
    </>
  )}

</div>
              </div>

              {/* EDIT FORM */}
              {role === "admin" && editId === o.id && (
                <div className="mt-3 p-3 border rounded bg-gray-50">

                  <input
                    className="border p-2 w-full mb-2"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-2"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />

                  <input
                    className="border p-2 w-full mb-2"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                  />

                  <div className="flex gap-2">

                    <button
                      onClick={async () => {
                        const token = localStorage.getItem("token");

                        const res = await fetch(`/api/orders/${o.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(editData),
                        });

                        if (res.ok) {
                          setEditId(null);
                          loadOrders({ current: orders.length });
                        }
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">

            <button
              onClick={() => setSelectedOrder(null)}
              className="text-red-500 float-right"
            >
              ❌ Close
            </button>

            <Invoice order={selectedOrder} />
          </div>
        </div>
      )}

    </div>
  );
}