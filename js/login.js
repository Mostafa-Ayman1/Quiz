const user = document.getElementById("user");
const submit = document.getElementById("login");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let inputName = user.value;

  if (inputName) {
    sessionStorage.setItem("user", inputName);
    window.location.href = "/index.html";
  }
});
