/*
  IMPORTANT:
  For email notifications, replace FORMSPREE_ENDPOINT below with your
  Formspree form endpoint, e.g. https://formspree.io/f/xxxxxxxx

  GitHub Pages is static hosting, so it cannot safely send email by itself.
*/

const FORMSPREE_ENDPOINT = "YOUR_FORMSPREE_ENDPOINT";

const state = {
  answers: [],
  startedAt: new Date().toISOString()
};

function addBackgroundItems() {
  const bg = document.getElementById("floating-bg");
  const isRosePage = document.getElementById("page-3").classList.contains("active");
  const symbols = isRosePage
    ? ["🌹", "🌹", "🌹", "🌹", "🌹", "🌹"]
    : ["♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥", "♡", "♥"];

  bg.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");
    item.className = "bg-item";
    item.textContent = symbols[i % symbols.length];
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.fontSize = `${12 + Math.random() * 18}px`;
    item.style.animationDelay = `${Math.random() * 5}s`;
    bg.appendChild(item);
  }
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  addBackgroundItems();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showModal(message, emoji, nextAction) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalEmoji = document.getElementById("modal-emoji");
  const button = document.getElementById("modal-button");

  modalMessage.textContent = message;
  modalEmoji.textContent = emoji;
  modal.classList.remove("hidden");

  button.onclick = () => {
    modal.classList.add("hidden");
    if (nextAction) nextAction();
  };
}

function recordAnswer(question, answer) {
  state.answers.push({
    question,
    answer,
    time: new Date().toISOString()
  });
  localStorage.setItem("loveQuizAnswers", JSON.stringify(state));
  sendResponse(question, answer);
}

async function sendResponse(question, answer) {
  if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
    return;
  }

  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        quiz_question: question,
        answer,
        submitted_at: new Date().toLocaleString(),
        quiz_started_at: state.startedAt
      })
    });
  } catch (error) {
    console.warn("Response could not be emailed:", error);
  }
}

function answerLove(answer) {
  recordAnswer("Do you love me?", answer === "yes" ? "Yes" : "No");

  if (answer === "yes") {
    showModal(
      "Awww... I knew it! 🥹❤️\nI love you too, Babes.",
      "💗",
      () => showPage("page-2")
    );
  } else {
    showModal(
      "tumara sar fod dunga agar na karogi to 😭\nchalo chup chap haan karo! 😒❤️",
      "😒",
      null
    );
  }
}

function checkDate() {
  const selected = document.getElementById("meet-date").value;

  if (!selected) {
    showModal("Date select karo na madam ji 😒❤️", "📅", null);
    return;
  }

  recordAnswer("Hum kab mile the?", selected);

  if (selected === "2025-10-02") {
    showModal(
      "Acchaaa... yaad hai tumko! ❤️\nGood girl!",
      "🥰",
      () => showPage("page-3")
    );
  } else {
    showModal(
      "Let's break up 😭\nMujhe baat hi nahi karni ab! 💔",
      "😭",
      null
    );
  }
}

function chooseMeeting(answer) {
  recordAnswer("Acha ye batao kab milogi?", answer === "2026-10-02" ? "2 Oct 2026" : "Pta nahi");

  if (answer === "2026-10-02") {
    showModal(
      "Thank you Janeman! 💕 for fixing a date! 🥹🌹\n by the way I'm waiting already ❤️",
      "🌹",
      () => showPage("page-4")
    );
  } else {
    showModal(
      "Don't text me ever again! 😤💔\n...just kidding, I love you. 🥺❤️",
      "😭",
      () => showPage("page-4")
    );
  }
}

addBackgroundItems();
