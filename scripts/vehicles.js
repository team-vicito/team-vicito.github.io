let buttons = {
  "Hauptmodelle": true,
  "Untermodelle": false,
  "Spitznamen": false,
};

const empty = document.querySelector(".empty");

const toggleEmpty = (item) => {
  buttons[item] = !buttons[item];

  if (!buttons["Hauptmodelle"] && !buttons["Untermodelle"] && !buttons["Spitznamen"]) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
  }
}

document.querySelector("input[data-label='Spitznamen']").addEventListener("click", (event) => {
  for (element of document.querySelectorAll(".name")) {
    let display = element.style.display;

    element.style.display = display == "none" ? "block" : "none";
  }
});

document.querySelector("input[data-label='Untermodelle']").addEventListener("click", (event) => {
  toggleEmpty("Untermodelle");

  for (element of document.querySelectorAll(".secondary")) {
    let display = element.style.display;

    element.style.display = display == "none" ? "flex" : "none";
  }
});

document.querySelector("input[data-label='Hauptmodelle']").addEventListener("click", (event) => {
  toggleEmpty("Hauptmodelle");

  for (element of document.querySelectorAll(".primary")) {
    let display = element.style.display;

    element.style.display = display == "none" ? "flex" : "none";
  }
});

