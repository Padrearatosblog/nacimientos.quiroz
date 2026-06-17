const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const modal = document.querySelector("#letter-modal");
const modalTitle = document.querySelector("#modal-title");
const modalText = document.querySelector("#modal-text");
const letterButtons = document.querySelectorAll("[data-letter]");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const compareRange = document.querySelector("#compare-range");
const compareAfter = document.querySelector(".compare-img.after");

const letters = {
  mama: {
    title: "Carta de mamá",
    text:
      "AMY, te imaginé durante meses y aun así superaste todos mis sueños. Llegaste pequeña, tranquila y llena de luz. Ojalá cuando leas esto sepas que cada día de tu primer año fue un regalo que aprendí a mirar despacio.",
  },
  papa: {
    title: "Carta de papá",
    text:
      "Mi pequeña AMY, el día que naciste entendí que la vida podía cambiar en un segundo. Tus manos diminutas, tus bostezos y tus primeras risas hicieron de casa nuestro lugar favorito del mundo.",
  },
  abuelos: {
    title: "Carta de los abuelos",
    text:
      "AMY, llegaste y nos devolviste la emoción de las primeras veces. Guardamos tus sonrisas como tesoros y esperamos verte crecer con esa curiosidad que iluminó tu primer año.",
  },
  amy: {
    title: "Carta para la AMY del futuro",
    text:
      "Cuando leas esto, quizá no recuerdes tus primeros pasos ni tu primera risa. Pero aquí está todo guardado: la forma en la que llegaste, la familia que te esperaba y el amor con el que empezó tu historia.",
  },
};

function setMenu(open) {
  navToggle.classList.toggle("is-open", open);
  navMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
  setMenu(!navMenu.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

function openLetter(letterId) {
  const letter = letters[letterId];

  if (!letter) {
    return;
  }

  modalTitle.textContent = letter.title;
  modalText.textContent = letter.text;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeLetter() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

letterButtons.forEach((button) => {
  button.addEventListener("click", () => openLetter(button.dataset.letter));
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeLetter);
});

if (compareRange && compareAfter) {
  compareRange.addEventListener("input", () => {
    const value = Number(compareRange.value);
    compareAfter.style.clipPath = `inset(0 0 0 ${value}%)`;
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    closeLetter();
  }
});
