import { db, ref, get, child } from "../utils/firebase.js";

const role = sessionStorage.getItem("userRole");
if (role !== "user") window.location.href = "admin-dashboard.html";

const productList = document.getElementById("productList");

async function loadProducts() {
  productList.innerHTML = "";
  const snapshot = await get(child(ref(db), "products"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    for (let id in data) {
      const { title, price, image } = data[id];
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${image}" width="100" />
        <h4>${title}</h4>
        <p>Price: $${price}</p>
      `;
      productList.appendChild(div);
    }
  }
}

loadProducts();
