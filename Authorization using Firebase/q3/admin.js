import { db, ref, push, set, get, child, remove } from "../utils/firebase.js";

const role = sessionStorage.getItem("userRole");
if (role !== "admin") window.location.href = "user-dashboard.html";

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = title.value;
  const price = +price.value;
  const image = image.value;
  const id = push(ref(db, "products")).key;
  await set(ref(db, `products/${id}`), { title, price, image });
  productForm.reset();
  loadProducts();
});

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
        <button onclick="deleteProduct('${id}')">Delete</button>
      `;
      productList.appendChild(div);
    }
  }
}

window.deleteProduct = async function(id) {
  await remove(ref(db, "products/" + id));
  loadProducts();
};

loadProducts();
