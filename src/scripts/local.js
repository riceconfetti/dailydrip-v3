document.querySelector(".hamburger").addEventListener("click", () => {
  document
    .querySelector(".nav-links")
    .classList.toggle("[transform:translate(100%,0)]");
});

document.querySelector(".settings").addEventListener("click", () => {
  document.querySelector("#settings").classList.toggle("hidden");
  document.querySelector("#settings").classList.toggle("flex");
});

document.querySelector(".setting_close").addEventListener("click", () => {
  document.querySelector("#settings").classList.toggle("flex");
  document.querySelector("#settings").classList.toggle("hidden");
});

document.querySelector(".settings_gear").addEventListener("click", () => {
  document.querySelector("#settings").classList.toggle("flex");
  document.querySelector("#settings").classList.toggle("hidden");
});

document.querySelector(".questions").addEventListener("click", () => {
  document.querySelector("#questions").classList.toggle("hidden");
  document.querySelector("#questions").classList.toggle("flex");
});

document.querySelector(".questions_close").addEventListener("click", () => {
  document.querySelector("#questions").classList.toggle("flex");
  document.querySelector("#questions").classList.toggle("hidden");
});

document.querySelector(".questions_gear").addEventListener("click", () => {
  document.querySelector("#questions").classList.toggle("flex");
  document.querySelector("#questions").classList.toggle("hidden");
});
