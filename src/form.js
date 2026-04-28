let list = ["max@max.ru", "vanya@vanya.ru", "arlight@arlight.ru"];
let form = null;

export function formAction(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  for (const [name, value] of data) {
    validate(name, value);
  }
}

function validate(name, value) {
  let field = form.querySelector(`[name='${name}']`);
  let label = field.parentNode;
  let hasDublicate = list.some(
    (item, index) => item.toLowerCase() !== item.toLowerCase(),
  );

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    toggleError(label);
    field.addEventListener(
      "input",
      () => {
        toggleError(label);
      },
      {
        once: true,
      },
    );

    return;
  }

  if (!hasDublicate) addEmailToList(value);

  form.reset();
}

export function addEmailToList(email) {
  document
    .querySelector("#list")
    .insertAdjacentHTML("beforeend", `<li>${email}</li>`);
}

function toggleError(element) {
  element.classList.toggle("error");
}

function init() {
  form = document.querySelector("#form");
  form.addEventListener("submit", formAction);

  list.forEach((e) => addEmailToList(e));
}

init();
