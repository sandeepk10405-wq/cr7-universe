// ----- ATTEND BUTTON (Matches Page) -----
const attendBtn = document.getElementById('attendBtn');
const counterSpan = document.getElementById('countDisplay');
if (attendBtn && counterSpan) {
  let count = 12;
  counterSpan.textContent = count;
  attendBtn.disabled = false;
  attendBtn.textContent = "✅ I'm Going!";
  attendBtn.style.opacity = "1";
  attendBtn.style.cursor = "pointer";

  attendBtn.addEventListener('click', function() {
    if (count === 12) {
      const siuuuSound = new Audio('https://www.myinstants.com/media/sounds/ronaldo-siuu.mp3');
      siuuuSound.play(); 
      count++;
      counterSpan.textContent = count;
      attendBtn.disabled = true;
      attendBtn.textContent = "✅ You're Going!";
      attendBtn.style.opacity = "0.6";
      attendBtn.style.cursor = "default";
    }
  });
}

// ----- COUNTDOWN TIMER (Matches Page) -----
const targetDate = new Date('2026-08-15T20:30:00+05:30').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  const now = new Date().getTime();
  const timeLeft = targetDate - now;
  if (timeLeft < 0) {
    document.querySelector('.countdown-container').innerHTML = `<h3 style="color:#f5c518; text-align:center; width:100%;">⚽ MATCH DAY! SIUUUU! ⚽</h3>`;
    clearInterval(timerInterval);
    return;
  }
  const days = Math.floor(timeLeft / (1000*60*60*24));
  const hours = Math.floor((timeLeft % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((timeLeft % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((timeLeft % (1000*60)) / 1000);
  daysEl.textContent = days < 10 ? '0'+days : days;
  hoursEl.textContent = hours < 10 ? '0'+hours : hours;
  minutesEl.textContent = minutes < 10 ? '0'+minutes : minutes;
  secondsEl.textContent = seconds < 10 ? '0'+seconds : seconds;
}
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ----- SHOUTBOX (Home Page & Fan Zone) -----
const shoutBtn = document.getElementById('shoutBtn');
const nameInput = document.getElementById('shoutName');
const msgInput = document.getElementById('shoutMsg');
const msgContainer = document.getElementById('shoutboxMessages');

if (shoutBtn && msgContainer) {
  let messages = JSON.parse(localStorage.getItem('cr7Messages')) || [];
  function renderMessages() {
    msgContainer.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'shout-msg';
      div.innerHTML = `<strong>${msg.name}</strong> <span>(${msg.time})</span><p>${msg.text}</p>`;
      msgContainer.appendChild(div);
    });
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
  renderMessages();

  function addMessage() {
    const name = nameInput.value.trim() || 'CR7 Army';
    const text = msgInput.value.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString();
    messages.push({ name, text, time });
    localStorage.setItem('cr7Messages', JSON.stringify(messages));
    nameInput.value = '';
    msgInput.value = '';
    renderMessages();
  }
  shoutBtn.addEventListener('click', addMessage);
  msgInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addMessage(); });
  nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addMessage(); });
}

// ----- SCROLL TO TOP BUTTON -----
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
  if (scrollBtn) {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----- TOGGLE INFO (Home Page) -----
function toggleInfo(id) {
  var panel = document.getElementById(id);
  if (panel) {
    if (panel.style.display === "none" || panel.style.display === "") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  }
}

// ----- STREAM MODAL (Matches Page - Additional safety) -----
// Note: Matches page already has its own modal functions, but we keep this for fallback.
// This prevents "function not defined" errors.
window.openModal = window.openModal || function() {};
window.closeModal = window.closeModal || function() {};
window.changeVideo = window.changeVideo || function() {};
