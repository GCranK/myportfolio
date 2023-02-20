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
//меняем цвет активной ссылки при reload
//добавляем в адрес ru en 
//меняем язык страницы с масива lang.js при клике на ru | en
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









