window.addEventListener('click', function (e) {
    if(e.target.id === 'actionbar-dismiss') {
        document.getElementById('actionbar').classList.add('hidden');
    }
});