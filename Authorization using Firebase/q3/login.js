import { auth, db, ref, get, child, signInWithEmailAndPassword } from "../utils/firebase.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = email.value;
  const password = password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const snapshot = await get(child(ref(db), "users/" + uid));
    if (snapshot.exists()) {
      const role = snapshot.val().role;
      sessionStorage.setItem("userRole", role);
      window.location.href = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
    }
  } catch (err) {
    alert("Incorrect email or password!");
  }
});
