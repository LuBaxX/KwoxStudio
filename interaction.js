const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('nav a')];
function showPage(moveFocus = false) {
    const id = location.hash.slice(1) || 'home';
    const active = pages.find(page => page.id === id) || pages[0];
    pages.forEach(page => {
        page.hidden = page !== active;
        page.classList.toggle('enter', page === active);
    });
    links.forEach(link => {
        if (link.hash === '#' + active.id) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
    document.title = 'KwoxStudio — ' + links.find(link => link.hash === '#' + active.id).textContent;
    if (moveFocus) {
        const heading = active.querySelector('h1');
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
}
window.addEventListener('hashchange', () => showPage(true));
showPage();
document.getElementById('year').textContent = new Date().getFullYear();
const copyButton = document.getElementById('copy-email');
const status = document.getElementById('copy-status');
let resetTimer;
copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText('kwoxstudio@gmail.com');
        copyButton.textContent = 'Copied!';
        status.textContent = 'Email address copied to clipboard.';
    } catch {
        copyButton.textContent = 'Copy unavailable';
        status.textContent = 'Could not copy. Select the email address or click it to contact us.';
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { copyButton.textContent = 'Copy email'; }, 2500);
});
