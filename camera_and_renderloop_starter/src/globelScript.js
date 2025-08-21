export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");   // fade-in
  setTimeout(() => {
    toast.classList.remove("show"); // fade-out
  }, 5000);
}

window.addEventListener('resize', () => {
  console.log("Resize handled globally");
});
