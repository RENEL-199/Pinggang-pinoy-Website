function loadCart() {
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (e) {
        cart = [];
    }
    const cartContainer = document.getElementById("cart-items");
    const totalText = document.getElementById("total-text");
    const checkoutBtn = document.getElementById("checkout-btn");

    cartContainer.innerHTML = "";
    let total = 0;

    if (!cart.length) {
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = ".5";
        totalText.innerText = "Total: ₱0.00";
        document.getElementById("checkout-form").style.display = "none";
        return;
    }

    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";

    cart.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("cart-card");
        row.style.marginBottom = "15px";
        row.innerHTML = `
            <div>
                <div class="item-title">${item.name}</div>
                <div class="item-price">₱${item.price.toFixed(2)}</div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
                <button class="qty-btn" data-action="minus" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-index="${index}">+</button>

                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    totalText.innerText = `Total: ₱${total.toFixed(2)}`;

    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.onclick = () => updateQuantity(btn.dataset.index, btn.dataset.action);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.onclick = () => removeItem(btn.dataset.index);
    });

    document.getElementById("checkout-btn").onclick = () => {
        document.getElementById("cart-items").style.display = "none";
        document.querySelector(".card").style.display = "none"; // the summary card
        document.getElementById("checkout-form").style.display = "block";
    };

    document.getElementById("checkout-form-element").onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const blockLot = document.getElementById("block_lot").value;
        const street = document.getElementById("street").value;
        const barangay = document.getElementById("barangay").value;
        const city = document.getElementById("city").value;
        const province = document.getElementById("province").value;
        const zip = document.getElementById("zip").value;
        const payment = document.getElementById("payment").value;
        const address = `${blockLot}, ${street}, ${barangay}, ${city}, ${province} ${zip}`.replace(/^, |, $/, '').replace(/, ,/g, ',');
        alert(`Order placed successfully!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment Method: ${payment}`);
        sessionStorage.removeItem("cart");
        document.getElementById("checkout-form-element").reset();
        document.getElementById("checkout-form").style.display = "none";
        document.getElementById("cart-items").style.display = "block";
        document.querySelector(".card").style.display = "block";
        loadCart();
    };
}

function updateQuantity(index, action) {
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (e) {
        cart = [];
    }
    if (action === "plus") cart[index].quantity++;
    else if (action === "minus" && cart[index].quantity > 1) cart[index].quantity--;

    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    } catch (e) {
        cart = [];
    }
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
});

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

