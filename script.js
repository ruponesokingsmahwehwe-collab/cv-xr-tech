const products = [
  ["iPhone 15 Pro","128GB | Unlocked","$620","assets/product-iphone.jpg"],
  ["Galaxy S24 Ultra","256GB | Unlocked","$580","assets/product-s24.jpg"],
  ["PlayStation 5","Disc Edition","$650","assets/product-ps5.jpg"],
  ["MacBook Air M2","8GB | 256GB","$850","assets/product-macbook.jpg"],
  ["Sony A6400","With 16–50mm Lens","$720","assets/product-sony.jpg"],
  ["JBL Tune 760NC","Wireless Headphones","$120","assets/product-jbl.jpg"]
];

const grid = document.getElementById("productGrid");
let cart = 0;

function render(list = products) {
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">No products found. Try another search.</div>';
    return;
  }
  grid.innerHTML = list.map((p, i) => `
    <article class="product">
      <img class="product-img" src="${p[3]}" alt="${p[0]}">
      <h3>${p[0]}</h3>
      <p>${p[1]}</p>
      <div class="price">${p[2]}</div>
      <button class="add" data-i="${i}">Add to Cart</button>
    </article>
  `).join("");

  document.querySelectorAll(".add").forEach(btn => {
    btn.addEventListener("click", () => {
      cart++;
      document.getElementById("cartCount").textContent = cart;
      btn.textContent = "Added ✓";
      setTimeout(() => btn.textContent = "Add to Cart", 900);
    });
  });
}

render();

document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  render(products.filter(p => p.join(" ").toLowerCase().includes(q)));
});

const chat = document.getElementById("chat");
document.getElementById("openChat").addEventListener("click", () => chat.classList.add("open"));
document.getElementById("closeChat").addEventListener("click", () => chat.classList.remove("open"));

function reply(q) {
  const body = document.getElementById("chatBody");
  const safeQ = q.replace(/[<>&]/g, "");
  body.innerHTML += `<p><b>You:</b> ${safeQ}</p>`;

  let answer = "I can help with products, shipping, payments and order requests. For live stock and final quotes, contact KINGS TECH on WhatsApp: +86 132 8113 5605.";
  if (/shipping|delivery/i.test(q)) {
    answer = "Estimated shipping: accessories $20–$40, phones/tablets $25–$45, laptops/cameras $35–$70, gaming consoles $40–$80. Final quotes depend on destination and package.";
  } else if (/payment|pay|wechat|bank/i.test(q)) {
    answer = "KINGS TECH accepts WeChat Pay and Bank Transfer.";
  } else if (/product|have|sell|category/i.test(q)) {
    answer = "We offer phones, laptops, gaming, cameras, audio, accessories, smart devices, car electronics, monitors and computer accessories.";
  } else if (/order/i.test(q)) {
    answer = "Tell us the product, quantity and destination. You can also WhatsApp KINGS TECH at +86 132 8113 5605.";
  }

  body.innerHTML += `<p><b>KINGS TECH:</b> ${answer}</p>`;
  body.scrollTop = body.scrollHeight;
}

document.querySelectorAll(".quick button").forEach(btn => {
  btn.addEventListener("click", () => reply(btn.dataset.q));
});

document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (value) {
    reply(value);
    input.value = "";
  }
});