
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

document.querySelectorAll(".footer-title").forEach(title => {
  title.addEventListener("click", () => {
    const section = title.parentElement;

    // Optional: close other sections (accordion behavior)
    document.querySelectorAll(".footer-section").forEach(sec => {
      if (sec !== section) sec.classList.remove("active");
    });

    // Toggle current section
    section.classList.toggle("active");
  });
});



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


function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        ${message} <br>
        <a href="CART.html" style="color: var(--nav-text);
        text-decoration: underline; font-size: 13px; font-weight: 500;">
            View Cart →
        </a>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
document.querySelectorAll(".cart-check input").forEach(input => {
    input.addEventListener("change", () => {

        if (!input.checked) return;

        const card = input.closest(".card-content, .card");
        if (!card) return;

        const name =
            card.querySelector(".card-title, h4, h2")?.innerText || "Item";

        const priceText =
            card.querySelector(".price, .price-amount")?.innerText || "0";

        const price = Number(priceText.replace(/[₱,]/g, ""));
        const isSubscription = !!card.querySelector(".plan-header");

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        if (isSubscription) {
            cart = cart.filter(i => i.type !== "subscription");
        }

        cart.push({
            id: name.replace(/\s+/g, "-").toLowerCase(),
            name,
            price,
            type: isSubscription ? "subscription" : "meal",
            quantity: 1
        });

        sessionStorage.setItem("cart", JSON.stringify(cart));

        showToast(`${name} added — ₱${price.toFixed(2)}`);
    });
});
