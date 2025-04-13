import { auth, db, ref, set, createUserWithEmailAndPassword } from "../utils/firebase.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = email.value;
  const password = password.value;
  const role = role.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    await set(ref(db, "users/" + uid), { email, role });
    alert("Registration Successful! Please login.");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});
