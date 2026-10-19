const products=[
["iPhone 15 Pro","120GB | Unlocked","$620","https://images.unsplash.com/photo-1592286927505-2fd5c6f6f4c2?auto=format&fit=crop&w=600&q=85"],
["Galaxy S24 Ultra","256GB | Unlocked","$580","https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=85"],
["PlayStation 5","Disc Edition","$650","https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=85"],
["MacBook Air M2","8GB | 256GB","$850","https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=85"],
["Sony A6400","With 16–50mm Lens","$720","https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85"],
["JBL Tune 760NC","Wireless Headphones","$120","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85"]
];
const grid=document.getElementById("productGrid");
let cart=0;
function render(list=products){
 grid.innerHTML=list.map((p,i)=>`<article class="product"><img src="${p[3]}" alt="${p[0]}"><h3>${p[0]}</h3><p>${p[1]}</p><div class="price">${p[2]}</div><button class="add" data-i="${i}">Add to Cart</button></article>`).join("");
 document.querySelectorAll(".add").forEach(b=>b.onclick=()=>{cart++;document.getElementById("cartCount").textContent=cart;});
}
render();
document.getElementById("search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(products.filter(p=>p.join(" ").toLowerCase().includes(q)))});
const chat=document.getElementById("chat");
document.getElementById("openChat").onclick=()=>chat.classList.add("open");
document.getElementById("closeChat").onclick=()=>chat.classList.remove("open");
function reply(q){
 const body=document.getElementById("chatBody");
 body.innerHTML+=`<p><b>You:</b> ${q}</p>`;
 let a="I can help with products, shipping and order requests. For live stock and final shipping quotes, please contact KINGS TECH.";
 if(/shipping|delivery/i.test(q)) a="Estimated shipping starts around $20 for accessories, $25 for phones/tablets, $35 for laptops/cameras, and $40 for gaming consoles. Final quotes depend on destination and package.";
 if(/product|have|sell/i.test(q)) a="We offer phones, laptops, gaming, cameras, audio, accessories, smart devices, monitors, computer accessories and car electronics.";
 if(/order/i.test(q)) a="Tell us the product, quantity and destination. KINGS TECH can then prepare an order request.";
 body.innerHTML+=`<p><b>KINGS TECH:</b> ${a}</p>`;body.scrollTop=body.scrollHeight;
}
document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>reply(b.dataset.q));
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const i=document.getElementById("chatInput");if(i.value.trim()){reply(i.value.trim());i.value=""}});
