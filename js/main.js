// Header component loader
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error('Nepodařilo se načíst header');
        }
        const headerHTML = await response.text();
        
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;
        }
    } catch (error) {
        console.error('Chyba při načítání headeru:', error);
    }
}

// Footer component loader
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) {
            throw new Error('Nepodařilo se načíst footer');
        }
        const footerHTML = await response.text();
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        }
    } catch (error) {
        console.error('Chyba při načítání footeru:', error);
    }
}

// Načíst header a footer když je DOM ready
document.addEventListener('DOMContentLoaded', async () => {
    await loadHeader();
    await loadFooter();
});
