// Load components for blog pages
async function loadNavigationAndFooter() {
    // Load header/navigation
    try {
        const headerResponse = await fetch('/header.html');
        if (headerResponse.ok) {
            const headerHTML = await headerResponse.text();
            const navigationContainer = document.getElementById('navigation-container');
            if (navigationContainer) {
                navigationContainer.innerHTML = headerHTML;
            }
        }
    } catch (error) {
        console.error('Chyba při načítání navigace:', error);
    }

    // Load footer
    try {
        const footerResponse = await fetch('/footer.html');
        if (footerResponse.ok) {
            const footerHTML = await footerResponse.text();
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = footerHTML;
            }
        }
    } catch (error) {
        console.error('Chyba při načítání footeru:', error);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavigationAndFooter);
