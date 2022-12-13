import '../css/app.css'

window.addEventListener('click', function (e) {
    if (e.target.id === 'mobile-open') {
        document.getElementById('mobile-menu').classList.remove('hidden');
        document.getElementById('mobile-menu').classList.add('block');
        document.getElementById('mobile-open').classList.remove('block');
        document.getElementById('mobile-open').classList.add('hidden');
        document.getElementById('mobile-close').classList.remove('hidden');
        document.getElementById('mobile-close').classList.add('block');
    } else if (e.target.id === 'mobile-close') {
        document.getElementById('mobile-menu').classList.remove('block');
        document.getElementById('mobile-menu').classList.add('hidden');
        document.getElementById('mobile-open').classList.remove('hidden');
        document.getElementById('mobile-open').classList.add('block');
        document.getElementById('mobile-close').classList.remove('block');
        document.getElementById('mobile-close').classList.add('hidden');
    }
})

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

require('./actionbar');
require('./video');

