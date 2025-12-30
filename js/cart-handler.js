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


// Attach to all Add-to-Cart checkboxes
document.querySelectorAll(".cart-check input").forEach(input => {
    input.addEventListener("change", () => {

        const card = input.closest(".card-content, .card");
        const name = card.querySelector(".card-title, .title, h2, h4")?.innerText || "Item";
        const priceText = card.querySelector(".price, .price-amount")?.innerText || "0";
        const price = Number(priceText.replace(/[₱,]/g, ""));
        const isSubscription = card.closest(".plan-header") !== null;

        let cart = [];
        try {
            cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        } catch (e) {
            cart = [];
        }

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

        input.checked = false; // Auto-uncheck after adding
    });
});
