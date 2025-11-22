// Individual Assignment 2- Glow Haven Website
//Kaelei Dowdie 2405421
//Tutor: Mrs.S.Badhika

// USER ACCOUNT SYSTEM //

// Load saved cart items from localStorage//
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Function to add items to cart
function addToCart(name, price) {

    //Check if item already exists in the cart
    const existing = cart.find(item => item.name === name);

    if (existing) {

        //Increase quantity if already added
        existing.quantity += 1;
    } else {
        //Otherwise create a new cart entry
        cart.push({ name: name, price: parseFloat(price), quantity: 1 });
    }
    //Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    //DOM-Show feedback message
    alert(`${name} has been added to your cart.`);
}

//DOM MANIPULATION FOR CART PAGE

 function loadCart() {
    const tbody = document.getElementById("cartTable"); // Table body for cart items
    const totalDiv = document.getElementById("cartTotal"); // Total display area

    if (!tbody || !totalDiv) return; // Stop if items are not on cart page

    tbody.innerHTML = "";
    let total = 0;

    //Loop through each saved cart item and calculate totals
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        const tax = subtotal * 0.15; // 15% tax
        const discount = 0; // No discounts applied
        const itemTotal = subtotal + tax - discount;

        total += itemTotal;

        //Add rows dynamically to the cart table
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>   
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>$${tax.toFixed(2)}</td>
                <td>$${discount.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
}

//Clear cart function
function clearCart() {
    cart = []; //Empty cart array
    localStorage.removeItem("cart"); //Remove from localStorage
updateCartDisplay(); //Refresh User Interface
} 

//Function to update cart display after changes
function updateCartDisplay() {
    if(typeof loadCart === "function") loadCart();
    if(typeof loadCheckout === "function") loadCheckout();
}

//REGISTRATION

function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    //Form validation requirement 
    if (username.trim() === "" || password.trim() === "") {
    alert(" Please fill in all fields.");
    return false;
}
    alert("Registration successful! Welcome to Glow Haven.");
    window.location.href = "login.html"; // Redirect to login page
    return true;
}

// LOGIN
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    
    if (username.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields.");
        return false;
    }
    
    alert("Login successful! Welcome back to Glow Haven.");
    window.location.href = "index.html";
    return true;
}

// Checkout Validation and Confirmation
function confirmCheckout(event) {
    if (event) event.preventDefault();

    const name = document.getElementById("shipName").value.trim();
    const address = document.getElementById("shipAddress").value.trim();
    const amount = document.getElementById("amountPaid").value.trim();

    // Validate shipping and payment details
    if (name === "" || address === "" || amount === "") {
        alert("Please fill in all shipping and payment details.");
        return false;
    }
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return false;
    }
    alert("Thank you for your purchase! Your order has been confirmed.");


    // Clear cart after checkout
    cart = [];
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // Redirect to home page
    return true;
}

//Event listener for registration form
document.addEventListener('DOMContentLoaded', function () {

    //PRODUCT PAGE-- Event delegation for Add to Cart buttons
    const productList = document.querySelector(".product-list");
    if (productList) {
        productList.addEventListener("click", function (event) {
          
            //Check if Add to Cart button was clicked
            if (event.target.classList.contains("add-to-cart")) {

                const name = event.target.dataset.name;
                const price = event.target.dataset.price;

                //Call cart function
                addToCart(name, price);

                window.location.href = "cart.html"; // Redirect to cart page after adding
            }
        });
    }

//Event listener for registration form
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", validateForm);
    }

//Event listener for login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
}

//Load cart on cart page
if(typeof loadCart === "function" && document.getElementById("cartTable")) {
    loadCart();
}

//Load checkout on checkout page
if(typeof loadCheckout === "function" && document.getElementById("checkoutItems")) {
    loadCheckout();
}


// Checkout Buttons
const cancelOrderBtn = document.getElementById("cancelOrder");
if (cancelOrderBtn) {
    cancelOrderBtn.addEventListener("click", function () {
        window.location.href = "cart.html";
    });
}
const closeCheckoutBtn = document.getElementById("closeCheckout");
if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}
const clearAllBtn = document.getElementById("clearAll");
if (clearAllBtn) {
    clearAllBtn.addEventListener("click", clearCart);
}

const confirmCheckoutForm = document.getElementById("checkoutForm");
if (confirmCheckoutForm) {
    confirmCheckoutForm.addEventListener("click", confirmCheckout);
}
});

//Checkout functions
function loadCheckout() {
    const tbody = document.getElementById("checkoutItems");
    const totalBox = document.getElementById("checkoutTotal");
    if (!tbody || !totalBox) return; 
    tbody.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        const tax = subtotal * 0.15; // 15% tax
        const discount = 0; // No discounts applied
        const itemTotal = subtotal + tax - discount;   

        total += itemTotal;   
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>   
                <td>$${item.price.toFixed(2)}</td>  
                <td>${item.quantity}</td>
                <td>$${subtotal.toFixed(2)}</td>    
                <td>$${tax.toFixed(2)}</td>
                <td>$${discount.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    totalBox.textContent = `Total Amount Due: $${total.toFixed(2)}`;
}



























  
