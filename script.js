const products = [
  ["iPhone 11","iPhone","$190"],["iPhone 11 Pro","iPhone","$220"],["iPhone 11 Pro Max","iPhone","$260"],
  ["iPhone 12","iPhone","$240"],["iPhone 12 Pro","iPhone","$280"],["iPhone 12 Pro Max","iPhone","$300"],
  ["iPhone 13","iPhone","$320"],["iPhone 13 Pro","iPhone","$350"],["iPhone 13 Pro Max","iPhone","$400"],
  ["iPhone 14","iPhone","$400"],["iPhone 14 Pro","iPhone","$470"],["iPhone 15","iPhone","$500"],
  ["iPhone 15 Pro","iPhone","$570"],["iPhone 16","iPhone","$620"],["iPhone 16 Pro","iPhone","$700"],
  ["iPhone 17","iPhone","$880"],["iPhone 17 Pro Max","iPhone","$1,200"],
  ["Samsung Phones","Samsung","Contact for price"],["Laptops","Laptops","Contact for price"],
  ["Gaming Gear","Gaming","Contact for price"],["Cameras","Cameras","Contact for price"]
];

const grid = document.querySelector("#product-grid");
const search = document.querySelector("#search");

function render(filter=""){
  grid.innerHTML="";
  products.filter(p => p.join(" ").toLowerCase().includes(filter.toLowerCase()))
    .forEach(([name,cat,price])=>{
      const card=document.createElement("article");
      card.className="card";
      card.innerHTML=`<div><span class="tag">${cat}</span><h3>${name}</h3><div class="price">${price}</div></div>
        <a class="order" href="#contact" onclick="selectProduct('${name.replace(/'/g,"\\'")}')">Order / enquire</a>`;
      grid.appendChild(card);
    });
}
function selectProduct(name){
  document.querySelector("#contact p").textContent =
    `Ask us about ${name}. We'll confirm current stock, condition, price and shipping.`;
}
search.addEventListener("input",e=>render(e.target.value));
render();
