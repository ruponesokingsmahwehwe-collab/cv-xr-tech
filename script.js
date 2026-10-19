const products=[
  {name:"Premium Smartphone",cat:"Phones",icon:"📱",desc:"iPhone, Samsung and other models"},
  {name:"Business Laptop",cat:"Laptops",icon:"💻",desc:"Study, work and professional laptops"},
  {name:"Gaming Setup",cat:"Gaming",icon:"🎮",desc:"Consoles, controllers and gaming gear"},
  {name:"Camera & Video",cat:"Cameras",icon:"📷",desc:"Photography and video equipment"},
  {name:"Audio Accessories",cat:"Accessories",icon:"🎧",desc:"Headphones, speakers and more"},
  {name:"Smart Device",cat:"Smart Devices",icon:"⌚",desc:"Wearables and connected technology"}
];

const productBox=document.getElementById("products");
function renderProducts(filter=""){
  productBox.innerHTML=products.filter(p=>!filter||p.cat===filter).map(p=>`
    <article class="product">
      <div class="product-img">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <button class="btn dark" onclick="openChatWith('I want information about ${p.name}.')">Ask about product</button>
    </article>`).join("");
}
renderProducts();

const overlay=document.getElementById("chatOverlay");
const messages=document.getElementById("messages");
const input=document.getElementById("chatInput");
function openChat(){overlay.classList.add("show");input.focus()}
function closeChat(){overlay.classList.remove("show")}
function addMsg(text,type="bot"){const d=document.createElement("div");d.className=`msg ${type}`;d.innerHTML=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
function openChatWith(text){openChat();input.value=text;sendMessage()}
function botReply(text){
  const q=text.toLowerCase();
  if(q.includes("shipping")||q.includes("delivery")||q.includes("country")){
    return "🌍 KINGS TECH offers worldwide shipping. We commonly serve Zimbabwe, South Africa, Zambia, Botswana, Malawi, Mozambique, Namibia, Tanzania, Kenya, Uganda, Ghana, Nigeria, the UK, USA, UAE, Europe and more. Final shipping depends on destination, weight, dimensions and courier.";
  }
  if(q.includes("price")||q.includes("cost")||q.includes("phone")||q.includes("iphone")||q.includes("samsung")){
    return "📱 We supply phones and other technology. For an exact current price and stock check, please choose a product or tell me the exact model. Live prices will be connected to the KINGS TECH product database.";
  }
  if(q.includes("order")||q.includes("buy")){
    return "🛒 I can start an order request. Please send: <b>product/model, quantity, destination country and your name</b>. A KINGS TECH team member can then confirm availability, final price and shipping.";
  }
  if(q.includes("human")||q.includes("person")||q.includes("agent")||q.includes("staff")){
    return "👤 No problem. I'll mark this for human support. Please leave your name, contact method and a short description of what you need.";
  }
  return "👑 I can help with products, shipping, order requests and customer support. Try asking: <b>“How much is an iPhone 15?”</b>, <b>“Do you ship to Zimbabwe?”</b> or <b>“I want to place an order.”</b>";
}
function sendMessage(){
  const text=input.value.trim(); if(!text)return;
  addMsg(text,"user"); input.value="";
  setTimeout(()=>addMsg(botReply(text)),350);
}
document.getElementById("chatOpen").onclick=openChat;
document.getElementById("heroChat").onclick=openChat;
document.getElementById("shippingChat").onclick=()=>openChatWith("I want to ask about shipping.");
document.getElementById("contactChat").onclick=openChat;
document.getElementById("chatClose").onclick=closeChat;
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();sendMessage()});
document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>openChatWith(b.dataset.intent));
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{renderProducts(b.dataset.category);document.getElementById("shop").scrollIntoView({behavior:"smooth"})});
