//бургер меню и прокрутка.
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
if (headerBurger) {
    headerBurger.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        headerBurger.classList.toggle('_active');
        headerMenu.classList.toggle('_active');
    });
}
//подключаем скроллы для меню.
const menuLinks = document.querySelectorAll('.header__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            //делаем проверку
            if(headerBurger.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                headerBurger.classList.remove('_active');
                headerMenu.classList.remove('_active'); 
            }
            //плавный скролл
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

const headerChangeLang = document.querySelector('.header__swith-mobile');
const headerLinks = document.querySelectorAll('.header__swith-mobile a');
const changeLang = document.querySelector('.informatinon__switch-on');
const links = document.querySelectorAll('.informatinon__switch-on a');

headerChangeLang.addEventListener('click', function(event) {
    if (event.target.matches('a')) {
        let lang = event.target.getAttribute('value');
        location.href = window.location.pathname + '#' + lang;
        location.reload();
        setActiveLink(event.target);
    }
});
changeLang.addEventListener('click', function(event) {
    if (event.target.matches('a')) {
        let lang = event.target.getAttribute('value');
        location.href = window.location.pathname + '#' + lang;
        location.reload();
        setActiveLink(event.target);
    }
});
function setActiveLink(link) {
    links.forEach(l => l.classList.remove('active'));
    headerLinks.forEach(l => l.classList.remove('active'));
    const langValue = link.getAttribute('value');
    links.forEach(l => {
        if (l.getAttribute('value') === langValue) {
            l.classList.add('active');
        }
    });
    headerLinks.forEach(l => {
        if (l.getAttribute('value') === langValue) {
            l.classList.add('active');
        }
    });
}
window.addEventListener('load', function() {
    let activeLang = window.location.hash.substring(1) || 'en';
    let activeLink = document.querySelector(`.informatinon__switch-on a[value="${activeLang}"]`) || document.querySelector(`.header__swith-mobile a[value="${activeLang}"]`);
    setActiveLink(activeLink);
    if (activeLang === 'ru') {
        document.querySelectorAll('.header__list li').forEach(function(el) {
            el.style.padding = '0px calc(7vw - 23px)';
        });
    }
    for (let key in textTranslations) {
        const element = document.querySelector(`.lang-${key}`);
        if (element) {
            element.innerHTML = textTranslations[key][activeLang];
        }
    };
});
//AOS

function showModal() {
    const userKey = 'user_data';
    const user = JSON.parse(localStorage.getItem(userKey)) || {};
    let timeLeftUntilNextModal = 600;
    const modal1 = document.createElement('div');
    modal1.classList.add('modal1');
    const currentTime = new Date().getTime();
    const lastModalTime = user.lastModalTime || 0;
    const timeSinceLastModal = currentTime - lastModalTime;

    if (timeSinceLastModal > 600000) {
        setTimeout(function () {
            overlay.style.display = 'block';
            document.body.appendChild(modal1);

            const countdownInterval = setInterval(function () {
                console.log(`Времени до следующего появления модального окна: ${timeLeftUntilNextModal} секунд`);
                timeLeftUntilNextModal--;

                if (timeLeftUntilNextModal <= 0) {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }, 1000);
    }

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Введите ваше имя';
    const button = document.createElement('button');
    button.innerText = 'Далее';
    modal1.appendChild(input);
    modal1.appendChild(button);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    button.addEventListener('click', function () {
        const modal2 = document.createElement('div');
        modal2.classList.add('modal2');
        const name = input.value || 'Гость';
        const message = document.createElement('p');
        message.innerText = `Добро пожаловать на мою страницу, ${name}!`;
        modal2.appendChild(message);
        modal2.addEventListener('click', function () {
            modal2.remove();
            overlay.remove();
        });

        setTimeout(function () {
            modal2.remove();
            overlay.remove();
        }, 3000);

        const timer = document.createElement('p');
        timer.classList.add('timer');
        timer.style.textAlign = 'center';
        let count = 3;
        timer.innerText = `${count}`;
        modal2.appendChild(timer);

        const interval = setInterval(function () {
            count--;
            timer.innerText = `${count}`;
            if (count <= 0) {
                clearInterval(interval);
                overlay.style.display = 'none';
            }
        }, 1000);

        modal1.remove();
        document.body.appendChild(modal2);
        user.lastModalTime = new Date().getTime();
        localStorage.setItem(userKey, JSON.stringify(user));
    });
}

window.addEventListener('load', showModal);
