
const sidebarLinks = document.querySelectorAll('.menu-sidebar li a');

function updateActiveSidebar() {
    const scrollPos = window.scrollY + 150; // adjust offset for navbar height
    let closestLink = null;
    let closestDistance = Infinity;

    sidebarLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        if (!targetId) return; // skip links without href
        const section = document.getElementById(targetId);
        if (section) {
            const distance = Math.abs(scrollPos - section.offsetTop);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestLink = link;
            }
        }
    });

    // remove all active classes
    sidebarLinks.forEach(link => link.parentElement.classList.remove('active'));

    // add active class to the closest link
    if (closestLink) {
        closestLink.parentElement.classList.add('active');
    }
}

// Scroll event: highlight sidebar
window.addEventListener('scroll', updateActiveSidebar);

// Click event: smooth scroll + highlight immediately
sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href').substring(1);
        if (!targetId) return; 
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            window.scrollTo({
                top: targetSection.offsetTop - 160,
                behavior: 'smooth'
            });
            // highlight immediately
            updateActiveSidebar();
        }
    });
});

// Initial call in case page loads mid-scroll
updateActiveSidebar();
