// ===============================
// AATHIN STORE
// SEARCH + CART + QUANTITY + CHECKOUT
// ===============================

let cart = JSON.parse(localStorage.getItem("aathinCart")) || [];


// ===============================
// ADD TO CART
// ===============================

function addToCart(button) {

    const productCard = button.closest(".product-card");

    const name =
        productCard.querySelector("h3").innerText;

    const priceText =
        productCard.querySelector(".price").innerText;

    const price =
        parseInt(priceText.replace(/[₹,]/g, ""));

    // Get product image
    const image =
        productCard.querySelector("img").getAttribute("src");


    const existingProduct = cart.find(function (item) {
        return item.name === name;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1,
            image: image
        });

    }


    localStorage.setItem(
        "aathinCart",
        JSON.stringify(cart)
    );


    updateCart();


    button.innerText = "✓ Added";

    setTimeout(function () {
        button.innerText = "+ Add";
    }, 1000);

}



// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartCount || !cartItems || !cartTotal) {
        return;
    }


    // ===========================
    // CART COUNT
    // ===========================

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });

    cartCount.innerText = totalQuantity;



    // ===========================
    // EMPTY CART
    // ===========================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <p>Your cart is empty</p>

                <span>
                    Add some products to get started.
                </span>

            </div>
        `;

        cartTotal.innerText = "₹0";

        return;
    }



    // ===========================
    // CART PRODUCTS
    // ===========================

    let itemsHTML = "";

    let total = 0;


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        itemsHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >


                <div class="cart-item-info">

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>


                    <div class="quantity-control">

                        <button
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>


                <div class="cart-item-right">

                    <strong>
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </strong>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">
                        ✕
                    </button>

                </div>

            </div>
        `;

    });


    cartItems.innerHTML = itemsHTML;


    cartTotal.innerText =
        "₹" + total.toLocaleString("en-IN");

}



// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;


    localStorage.setItem(
        "aathinCart",
        JSON.stringify(cart)
    );


    updateCart();

}



// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "aathinCart",
        JSON.stringify(cart)
    );


    updateCart();

}



// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "aathinCart",
        JSON.stringify(cart)
    );


    updateCart();

}



// ===============================
// PAGE READY
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ===========================
        // SEARCH
        // ===========================

        const searchBtn =
            document.getElementById("search-btn");

        const searchBox =
            document.getElementById("search-box");

        const searchInput =
            document.getElementById("search-input");

        const searchClose =
            document.getElementById("search-close");



        // Open search

        if (searchBtn && searchBox) {

            searchBtn.addEventListener(
                "click",
                function () {

                    searchBox.classList.add("active");

                    if (searchInput) {

                        searchInput.focus();

                    }

                }
            );

        }



        // Close search

        if (searchClose && searchBox) {

            searchClose.addEventListener(
                "click",
                function () {

                    searchBox.classList.remove("active");

                    if (searchInput) {

                        searchInput.value = "";

                    }

                    showAllProducts();

                }
            );

        }



        // Search products

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    const text =
                        searchInput.value
                            .toLowerCase()
                            .trim();


                    const products =
                        document.querySelectorAll(
                            ".product-card"
                        );


                    products.forEach(
                        function (product) {

                            const nameElement =
                                product.querySelector("h3");

                            const categoryElement =
                                product.querySelector(
                                    ".product-category"
                                );


                            const name =
                                nameElement
                                    ? nameElement.innerText.toLowerCase()
                                    : "";


                            const category =
                                categoryElement
                                    ? categoryElement.innerText.toLowerCase()
                                    : "";


                            if (
                                name.includes(text) ||
                                category.includes(text)
                            ) {

                                product.style.display =
                                    "block";

                            } else {

                                product.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        }



        // ===========================
        // CART PANEL
        // ===========================

        const cartBtn =
            document.getElementById("cart-btn");

        const cartPanel =
            document.getElementById("cart-panel");

        const cartOverlay =
            document.getElementById("cart-overlay");

        const cartClose =
            document.getElementById("cart-close");



        // Open cart

        if (
            cartBtn &&
            cartPanel &&
            cartOverlay
        ) {

            cartBtn.addEventListener(
                "click",
                function () {

                    updateCart();

                    cartPanel.classList.add("active");

                    cartOverlay.classList.add("active");

                }
            );

        }



        // Close cart

        function closeCart() {

            if (cartPanel) {

                cartPanel.classList.remove("active");

            }


            if (cartOverlay) {

                cartOverlay.classList.remove("active");

            }

        }



        if (cartClose) {

            cartClose.addEventListener(
                "click",
                function () {

                    closeCart();

                }
            );

        }



        if (cartOverlay) {

            cartOverlay.addEventListener(
                "click",
                function () {

                    closeCart();

                }
            );

        }



        // ===========================
        // CHECKOUT
        // ===========================

        const checkoutBtn =
            document.querySelector(".checkout-btn");


        if (checkoutBtn) {

            checkoutBtn.addEventListener(
                "click",
                function () {

                    if (cart.length === 0) {

                        alert("Your cart is empty.");

                        return;

                    }


                    window.location.href =
                        "checkout.html";

                }
            );

        }



        // Show saved cart

        updateCart();

    }
);



// ===============================
// SHOW ALL PRODUCTS
// ===============================

function showAllProducts() {

    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(
        function (product) {

            product.style.display = "block";

        }
    );

}