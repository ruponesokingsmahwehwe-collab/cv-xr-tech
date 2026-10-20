const products = [
  ["iPhone 15 Pro","128GB | Unlocked","$620","assets/product-iphone.jpg","Phones"],
  ["Galaxy S24 Ultra","256GB | Unlocked","$580","assets/product-s24.jpg","Phones"],
  ["PlayStation 5","Disc Edition","$650","assets/product-ps5.jpg","Gaming"],
  ["MacBook Air M2","8GB | 256GB","$850","assets/product-macbook.jpg","Laptops"],
  ["Sony A6400","With 16–50mm Lens","$720","assets/product-sony.jpg","Cameras"],
  ["JBL Tune 760NC","Wireless Headphones","$120","assets/product-jbl.jpg","Audio"]
];

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");
let cart = [];
let activeCategory = "All";

function render(list = products) {
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">No products found. Try another search or choose View All Products.</div>';
    return;
  }
  grid.innerHTML = list.map((p) => {
    const originalIndex = products.indexOf(p);
    return `
      <article class="product">
        <img class="product-img" src="${p[3]}" alt="${p[0]}">
        <h3>${p[0]}</h3>
        <p>${p[1]}</p>
        <div class="price">${p[2]}</div>
        <button class="add" data-i="${originalIndex}">Add to Cart</button>
      </article>`;
  }).join("");

  document.querySelectorAll(".add").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.i)));
  });
}

function currentProducts() {
  const q = document.getElementById("search").value.trim().toLowerCase();
  return products.filter(p => {
    const categoryMatch = activeCategory === "All" || p[4] === activeCategory;
    const searchMatch = !q || p.join(" ").toLowerCase().includes(q);
    return categoryMatch && searchMatch;
  });
}

function refreshProducts() { render(currentProducts()); }

function addToCart(index) {
  const product = products[index];
  const existing = cart.find(item => item.index === index);
  if (existing) existing.qty++;
  else cart.push({ index, qty: 1 });
  updateCart();
  openCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  cartTotal.textContent = count;
  if (!cart.length) {
    cartBody.innerHTML = '<p class="muted">Your cart is empty.</p>';
    return;
  }
  cartBody.innerHTML = cart.map(item => {
    const p = products[item.index];
    return `<div class="cart-item"><img src="${p[3]}" alt="${p[0]}"><div><b>${p[0]}</b><small>${p[2]} × ${item.qty}</small></div><button class="remove-item" data-i="${item.index}" aria-label="Remove ${p[0]}">×</button></div>`;
  }).join("");
  document.querySelectorAll(".remove-item").forEach(btn => btn.addEventListener("click", () => {
    cart = cart.filter(item => item.index !== Number(btn.dataset.i));
    updateCart();
  }));
}

function openCart() { cartPanel.classList.add("open"); cartPanel.setAttribute("aria-hidden", "false"); }
function closeCart() { cartPanel.classList.remove("open"); cartPanel.setAttribute("aria-hidden", "true"); }

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("accountBtn").addEventListener("click", () => document.getElementById("contact").scrollIntoView({behavior:"smooth"}));

document.getElementById("search").addEventListener("input", refreshProducts);

document.querySelectorAll(".cat[data-category]").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    activeCategory = card.dataset.category;
    document.getElementById("featured").scrollIntoView({behavior:"smooth"});
    refreshProducts();
  });
});

document.querySelectorAll('.main-nav a[href="#phones"], .main-nav a[href="#laptops"], .main-nav a[href="#gaming"], .main-nav a[href="#accessories"], .main-nav a[href="#cameras"], .main-nav a[href="#audio"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    activeCategory = link.textContent.trim();
    document.getElementById("featured").scrollIntoView({behavior:"smooth"});
    refreshProducts();
  });
});

document.getElementById("viewAllProducts").addEventListener("click", () => { activeCategory = "All"; document.getElementById("search").value = ""; refreshProducts(); });
document.getElementById("viewAllCategories").addEventListener("click", () => { activeCategory = "All"; });

const chat = document.getElementById("chat");
document.getElementById("openChat").addEventListener("click", () => chat.classList.add("open"));
document.getElementById("closeChat").addEventListener("click", () => chat.classList.remove("open"));

function reply(q) {
  const body = document.getElementById("chatBody");
  const safeQ = q.replace(/[<>&]/g, "");
  body.innerHTML += `<p><b>You:</b> ${safeQ}</p>`;
  let answer = "I can help with products, worldwide shipping, payments and order requests. For live stock and final quotes, contact KINGS TECH on WhatsApp: +86 132 8113 5605.";
  if (/shipping|delivery|worldwide|country/i.test(q)) {
    answer = "KINGS TECH ships worldwide from China. Estimated shipping: accessories $20–$40, phones/tablets $25–$45, laptops/cameras $35–$70, gaming consoles $40–$80. Final quotes depend on destination and package.";
  } else if (/payment|pay|wechat|bank/i.test(q)) {
    answer = "KINGS TECH accepts WeChat Pay and Bank Transfer.";
  } else if (/product|have|sell|category/i.test(q)) {
    answer = "We offer phones, laptops, gaming, cameras, audio, accessories, smart devices, car electronics, monitors, computer accessories and more.";
  } else if (/order|buy/i.test(q)) {
    answer = "Add products to your cart, then choose ORDER ON WHATSAPP, or tell us the product, quantity and destination.";
  }
  body.innerHTML += `<p><b>KINGS TECH:</b> ${answer}</p>`;
  body.scrollTop = body.scrollHeight;
}

document.querySelectorAll(".quick button").forEach(btn => btn.addEventListener("click", () => reply(btn.dataset.q)));
document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (value) { reply(value); input.value = ""; }
});

document.getElementById("checkoutBtn").addEventListener("click", (e) => {
  if (!cart.length) { e.preventDefault(); alert("Your cart is empty. Add a product first."); return; }
  const order = cart.map(item => `${products[item.index][0]} x${item.qty}`).join(", ");
  e.currentTarget.href = `https://wa.me/8613281135605?text=${encodeURIComponent("Hello KINGS TECH, I want to order: " + order)}`;
});

render();
updateCart();
