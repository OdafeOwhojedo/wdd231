const dialog = document.querySelector("dialog");

export function openModal(content) {
  dialog.innerHTML = content;
  dialog.showModal();
}
