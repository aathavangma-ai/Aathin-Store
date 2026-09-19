// ===============================
// AATHIN STORE - CHECKOUT
// ORDER SUMMARY + CUSTOMER DETAILS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutSubtotal =
        document.getElementById("checkout-subtotal");

    const checkoutTotal =
        document.getElementById("checkout-total");

    const placeOrderBtn =
        document.getElementById("place-order-btn");

    const successMessage =
        document.getElementById("order-success");


    // ===============================
    // GET CART FROM LOCAL STORAGE
    // ===============================

    const cart =
        JSON.parse(localStorage.getItem("aathinCart")) || [];


    // ===============================
    // SHOW CHECKOUT CART
    // ===============================

    function showCheckoutCart() {

        if (!checkoutItems) {
            return;
        }


        // Empty cart

        if (cart.length === 0) {

            checkoutItems.innerHTML = `
                <p class="no-items">
                    Your cart is empty.
                </p>
            `;

            checkoutSubtotal.innerText = "₹0";
            checkoutTotal.innerText = "₹0";

            return;
        }


        let itemsHTML = "";
        let total = 0;


        // ===============================
        // DISPLAY EACH PRODUCT
        // ===============================

        cart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            itemsHTML += `
                <div class="checkout-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="checkout-item-image"
                    >


                    <div class="checkout-item-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                            × ${item.quantity}
                        </p>

                    </div>


                    <strong class="checkout-item-total">
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </strong>

                </div>
            `;

        });


        checkoutItems.innerHTML = itemsHTML;


        // ===============================
        // TOTAL
        // ===============================

        checkoutSubtotal.innerText =
            "₹" + total.toLocaleString("en-IN");

        checkoutTotal.innerText =
            "₹" + total.toLocaleString("en-IN");

    }


    // Show cart when page loads

    showCheckoutCart();



    // ===============================
    // PLACE ORDER
    // ===============================

    if (placeOrderBtn) {

        placeOrderBtn.addEventListener(
            "click",
            function () {


                const name =
                    document
                        .getElementById("customer-name")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("customer-email")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("customer-phone")
                        .value
                        .trim();


                const address =
                    document
                        .getElementById("customer-address")
                        .value
                        .trim();


                const city =
                    document
                        .getElementById("customer-city")
                        .value
                        .trim();


                const pincode =
                    document
                        .getElementById("customer-pincode")
                        .value
                        .trim();



                // ===============================
                // VALIDATION
                // ===============================

                if (
                    !name ||
                    !email ||
                    !phone ||
                    !address ||
                    !city ||
                    !pincode
                ) {

                    alert(
                        "Please fill all customer details."
                    );

                    return;
                }



                // ===============================
                // CHECK CART
                // ===============================

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;
                }



                // ===============================
                // SHOW SUCCESS MESSAGE
                // ===============================

                if (successMessage) {

                    successMessage.style.display =
                        "flex";

                }



                // ===============================
                // CLEAR CART
                // ===============================

                localStorage.removeItem(
                    "aathinCart"
                );

            }
        );

    }

});