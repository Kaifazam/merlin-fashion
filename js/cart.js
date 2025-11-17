// ---------------------------------------------
// CART USING LOCAL STORAGE
// ---------------------------------------------
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function addToCart(product) {
    let cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        product.qty = 1;
        cart.push(product);
    }

    saveCart(cart);
}

// ---------------- Quantity Controls ----------------
function removeItem(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
}

function increaseQty(id) {
    let cart = getCart();
    cart.map(item => {
        if (item.id === id) item.qty += 1;
    });
    saveCart(cart);
}

function decreaseQty(id) {
    let cart = getCart();
    cart.map(item => {
        if (item.id === id && item.qty > 1) item.qty -= 1;
    });
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// ---------------- Cart Renderer ----------------
function renderCart() {
    const cart = getCart();
    const ul = document.getElementById("ul_pr");
    ul.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="cart-row">
                <span>${item.name} (Rs.${item.price})</span>
                <div class="qty-btns">
                    <button onclick="decreaseQty('${item.id}')">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty('${item.id}')">+</button>
                </div>
                <button onclick="removeItem('${item.id}')">Remove</button>
            </div>
        `;

        ul.appendChild(li);
    });

    // Price Summary
    let tax = (subtotal * 0.05);
    let shipping = cart.length > 0 ? 50 : 0;
    let grand = subtotal + tax + shipping;

    document.getElementById("subtotal").innerText = "Rs." + subtotal;
    document.getElementById("tax").innerText = "Rs." + tax.toFixed(2);
    document.getElementById("shipping").innerText = "Rs." + shipping;
    document.getElementById("grandtotal").innerText = "Rs." + grand.toFixed(2);
}

renderCart();

// ---------------- Checkout ----------------

function startCheckout() {
    document.getElementById("checkout-panel").style.display = "block";
}

function confirmOrder() {
    let name = document.getElementById("cust-name").value;
    let address = document.getElementById("cust-address").value;
    let payment = document.getElementById("payment-method").value;

    if (!name || !address) {
        alert("Please fill your details.");
        return;
    }

    clearCart(); // Empty cart on order

    document.getElementById("checkout-panel").style.display = "none";
    document.getElementById("order-success").style.display = "block";

    console.log("Order placed:", { name, address, payment });
}
