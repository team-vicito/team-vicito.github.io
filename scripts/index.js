const links = document.querySelector(".link-wrap");
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

const updateLinks = (path) => {
  for (let link of links.children) {
    link.classList.remove("active")
  }

  for (let link of links.children) {
    if (link.href == path) {
      link.classList.add("active");
      return;
    }
  }

  // document.getElementById("start").classList.add("active");
}

const applyNavigationShadow = (distance) => {
  const nav = document.querySelector("nav");

  nav.classList.remove("shadow");

  if (distance > 1) nav.classList.add("shadow");
}


const updateScroll = () => {
  const scrolled = window.scrollY;

  applyNavigationShadow(scrolled);
  if (window.innerWidth >= 1118) document.querySelector(".vehicle").style.top = "calc(40% - " + (scrolled / 3) + "px)";
}

window.addEventListener("scroll", updateScroll);

if (burger) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
  });
}

updateLinks(`${location.origin}${location.pathname}`);

// TODO: Use
// TODO: Fix colors
const setCurrentColorTheme = (theme) => {
  let variables = document.documentElement.style;

  if (theme == "dark") {
    variables.setProperty("--background", "#121212");
    variables.setProperty("--contrast", "#FEFEFE");
    variables.setProperty("--shadow", "#000000");
    variables.setProperty("--accent", "#EB3B5A");
    variables.setProperty("--wish", "#EB3B5AAA");
    variables.setProperty("--text", "#FFFFFF");
  } else if (theme == "light") {
    variables.setProperty("--background", "#FFFFFF");
    variables.setProperty("--contrast", "#000000");
    variables.setProperty("--shadow", "#000000");
    variables.setProperty("--accent", "#EB3B5A");
    variables.setProperty("--wish", "#EB3B5AAA");
    variables.setProperty("--text", "#000000");
  } else {
    console.error(`Unknown Theme ${theme}`);
  }
}

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  localStorage.setItem("currentTheme", "dark");
} else {
  localStorage.setItem("currentTheme", "light");
}

const competition = "1648166400000";

const getTimeToCompetition = (endtime) => {
  const time = endtime - Date.now();

  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  return {
    "time": time,
    "days": days,
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  };
}

// TODO: add "und" & ","
const buildCountdownSentence = (t) => {
  let sentence = "";

  if (t.days != 0) sentence = `${sentence} <span>${t.days}</span> ${t.days == 1 ? "Tag" : "Tage"}`;
  if (t.hours != 0) sentence = `${sentence} <span>${t.hours}</span> ${t.hours == 1 ? "Stunde" : "Stunden"}`;
  if (t.minutes != 0) sentence = `${sentence} <span>${t.minutes}</span> ${t.minutes == 1 ? "Minute" : "Minuten"}`;
  if (t.seconds != 0) sentence = `${sentence} <span>${t.seconds}</span> ${t.seconds == 1 ? "Sekunde" : "Sekunden"}`;

 if (sentence != "") {
   sentence = `Es verbleiben ${sentence}!`;
 } else {
   sentence = "Der Wettbewerb hat begonnen!";
 }

  return sentence;
}

const initializeTimer = (selector, endtime) => {
  const timer = document.querySelector(selector);

  if (timer == null) return;

  const countdown = setInterval(() => {
    const t = getTimeToCompetition(endtime);

    timer.innerHTML = buildCountdownSentence(t);

    if (t.time <= 0) {
      clearInterval(countdown);
      timer.innerHTML = "Der Wettbewerb hat begonnen!";
    }
  }, 1000);
}

// TODO: Use
initializeTimer("#countdown", competition);

// TODO: Languages