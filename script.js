document.addEventListener('DOMContentLoaded', function() {
    // Функция для форматирования даты
    function formatWeddingDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    // Элемент для отображения даты
    const dateElement = document.querySelector('.date');
    let weddingDate = new Date('September 28, 2025 16:00');

    // Обновление даты каждую секунду
    function updateWeddingDate() {
        const now = new Date();

        // Если текущая дата позже даты свадьбы, добавляем год
        if (now > weddingDate) {
            weddingDate = new Date(weddingDate);
            weddingDate.setFullYear(now.getFullYear() + 1);
        }

        dateElement.textContent = formatWeddingDate(weddingDate);
    }

    // Инициализация и запуск таймера даты
    updateWeddingDate();
    setInterval(updateWeddingDate, 1000);

    // Таймер обратного отсчета
    function updateCountdown() {
        const now = new Date();
        let distance = weddingDate - now;

        // Если свадьба уже прошла в этом году, считаем до следующего года
        if (distance < 0) {
            const nextYearWedding = new Date(weddingDate);
            nextYearWedding.setFullYear(now.getFullYear() + 1);
            distance = nextYearWedding - now;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    // Плавная прокрутка
    document.getElementById('scrollDown').addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight - 100,
            behavior: 'smooth'
        });
    });

    // Модальное окно с картой
    const mapModal = document.getElementById('mapModal');
    const openMapBtn = document.getElementById('openMapBtn');
    const closeModal = document.getElementById('closeModal');

    openMapBtn.addEventListener('click', function() {
        mapModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function() {
        mapModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            mapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Карусель
    const carousel = document.getElementById('carousel');
    const carouselInner = document.getElementById('carouselInner');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators').children;

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Обновляем индикаторы
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
            if (i === currentIndex) {
                indicators[i].classList.add('active');
            }
        }
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Клик по индикаторам
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    }

    // Автопрокрутка карусели
    let carouselInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);

    carousel.addEventListener('mouseenter', function() {
        clearInterval(carouselInterval);
    });

    carousel.addEventListener('mouseleave', function() {
        carouselInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });

    // Форма RSVP
    const rsvpForm = document.getElementById('rsvpForm');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const attending = document.getElementById('attending').value;

        if (attending === 'yes') {
            alert(`Спасибо, ${name}! Мы рады, что вы сможете разделить с нами этот день!`);
        } else {
            alert(`Спасибо, ${name}, что сообщили нам. Будем скучать!`);
        }

        rsvpForm.reset();
    });

    // Конфиденциальность
    const privacyNotice = document.getElementById('privacyNotice');
    const acceptPrivacy = document.getElementById('acceptPrivacy');

    if (!localStorage.getItem('privacyAccepted')) {
        privacyNotice.style.display = 'flex';
    }

    acceptPrivacy.addEventListener('click', function() {
        localStorage.setItem('privacyAccepted', 'true');
        privacyNotice.style.display = 'none';
    });

    // Анимация при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.detail-card, .section-title, .gallery-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимации
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.detail-card, .section-title, .gallery-item');

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        setTimeout(() => {
            animateOnScroll();
        }, 500);
    });

    window.addEventListener('scroll', animateOnScroll);

    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');

        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});
        const BOT_TOKEN = "7274111004:AAG80AoBOzzUFlHfbaBe50e7yOGzUCLl6cc";
const CHAT_ID = "5168984360";

// Функция для отправки данных в Telegram
async function sendToTelegram(formData) {
    const message = `📋 Новый ответ на приглашение!\n\n` +
                   `👤 Имя: ${formData.name}\n` +
                   `📞 Телефон: ${formData.phone || 'Не указан'}\n` +
                   `👥 Количество гостей: ${formData.guests}\n` +
                   `✅ Присутствие: ${formData.attending === 'yes' ? 'Приду' : 'Не смогу'}\n` +
                   `💬 Сообщение: ${formData.message || 'Без сообщения'}\n\n` +
                   `🕒 Время отправки: ${new Date().toLocaleString()}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();
        console.log("Уведомление отправлено:", data);
        return data.ok;
    } catch (error) {
        console.error("Ошибка отправки:", error);
        return false;
    }
}

// Модифицируем обработчик формы RSVP
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.textContent = '';
rsvpForm.appendChild(successMessage);

rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone')?.value || null,
        guests: document.getElementById('guests').value,
        attending: document.getElementById('attending').value,
        message: document.getElementById('message').value
    };

    // Валидация
    if (!formData.name || formData.name.length < 2) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }

    // Показываем загрузку
    const submitBtn = rsvpForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Отправляем в Telegram
    const isSent = await sendToTelegram(formData);

    // Возвращаем кнопку в исходное состояние
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;

    if (isSent) {
        // Показываем сообщение об успехе
        successMessage.style.display = 'block';
        rsvpForm.reset();

        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        // Показываем алерт с подтверждением
        if (formData.attending === 'no') {
            alert(`Спасибо, ${formData.name}! Мы рады, что вы сможете разделить с нами этот день!`);
        } else {
            alert(`Спасибо, ${formData.name}, что сообщили нам. Будем скучать!`);
        }
    } else {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }

});

// Добавляем поле для телефона в форму (если его нет)
if (!document.getElementById('phone')) {
    const phoneGroup = document.createElement('div');
    phoneGroup.className = 'form-group';
    phoneGroup.innerHTML = `
        <label for="phone" class="form-label">Ваш телефон (необязательно)</label>
        <input type="tel" id="phone" class="form-input" placeholder="+7 (XXX) XXX-XX-XX">
    `;

    // Вставляем перед полем "Количество гостей"
    const guestsGroup = document.querySelector('#guests').parentElement;
    guestsGroup.parentNode.insertBefore(phoneGroup, guestsGroup);
}