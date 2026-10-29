// ==========================================
// 1. ВИБІРКА ЕЛЕМЕНТІВ (querySelector / querySelectorAll)
// ==========================================
const planSelect = document.querySelector('#planSelect');
const monthsInput = document.querySelector('#monthsInput');
const discountCheckbox = document.querySelector('#discountCheckbox');
const totalPriceEl = document.querySelector('#totalPrice');
const calcForm = document.querySelector('#calcForm');

const feedbackForm = document.querySelector('#feedbackForm');
const authorInput = document.querySelector('#authorInput');
const textInput = document.querySelector('#textInput');
const feedbackList = document.querySelector('#feedbackList');
const feedbackCountEl = document.querySelector('#feedbackCount');

const themeToggleBtn = document.querySelector('#themeToggleBtn');
const windowSizeInfo = document.querySelector('#windowSizeInfo');

let feedbackCounter = 0;

// ==========================================
// 2. КАЛЬКУЛЯТОР ВАРТОСТІ (Події input/change)
// ==========================================
function calculateTotal() {
  const pricePerMonth = parseFloat(planSelect.value) || 0;
  const months = parseInt(monthsInput.value, 10) || 1;
  const hasDiscount = discountCheckbox.checked;

  let total = pricePerMonth * months;
  if (hasDiscount) {
    total *= 0.9; // 10% знижки
  }

  // Зміна текстового вмісту через textContent
  totalPriceEl.textContent = total.toFixed(2);
}

// Призначення подій додаванням методів addEventListener
planSelect.addEventListener('change', calculateTotal);
monthsInput.addEventListener('input', calculateTotal);
discountCheckbox.addEventListener('change', calculateTotal);

// Подія submit для калькулятора з блокуванням перезавантаження
calcForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Скасування стандартної дії
  alert(`Дякуємо! Оформлено підписку на суму ${totalPriceEl.textContent} грн.`);
});

// ==========================================
// 3. БЛОК ВІДГУКІВ (Динамічні вузли + Подія submit)
// ==========================================
feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Блокування перезавантаження сторінки

  const author = authorInput.value.trim();
  const text = textInput.value.trim();

  if (!author || !text) return;

  // Динамічне створення вузла коментаря
  const feedbackCard = document.createElement('div');
  feedbackCard.classList.add('feedback-item');

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  feedbackCard.innerHTML = `
    <div>
      <span class="feedback-author"></span>
      <span class="feedback-date">${now}</span>
    </div>
    <p class="feedback-text"></p>
  `;

  // Захист від XSS через textContent
  feedbackCard.querySelector('.feedback-author').textContent = author;
  feedbackCard.querySelector('.feedback-text').textContent = text;

  // Додавання вузла в DOM
  feedbackList.prepend(feedbackCard);

  // Оновлення лічильника
  feedbackCounter++;
  feedbackCountEl.textContent = feedbackCounter;

  // Очищення форми
  feedbackForm.reset();
});

// ==========================================
// 4. КЕРУВАННЯ ТЕМОЮ ТА КЛАВІАТУРА (classList.toggle + keydown)
// ==========================================
themeToggleBtn.addEventListener('click', () => {
  // Перемикання класу через classList.toggle
  document.body.classList.toggle('dark-theme');
});

// Обробка події клавіатури keydown (Escape для швидкого скидання відгуку)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    feedbackForm.reset();
  }
});

// ==========================================
// 5. ВИКОРИСТАННЯ BOM (Browser Object Model)
// ==========================================
function updateWindowSize() {
  // Взаємодія з об'єктом window (window.innerWidth / window.innerHeight)
  windowSizeInfo.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
}

// Подія resize для об'єкта window
window.addEventListener('resize', updateWindowSize);

// Початковий виклик для відображення поточного розміру
updateWindowSize();