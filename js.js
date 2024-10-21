// Import both fetchProducts and supabase client 
import { fetchProducts, supabase } from './supabase.js';


document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data from Supabase
        const products = await fetchProducts();
        
        if (!products) {
            console.error('No products returned from Supabase');
            return;
        }

        console.log('Fetched products:', products);

        // Hero Section Toggle
        const heroSection = document.getElementById('hero2');
        if (heroSection) {
            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Toggle Section Visibility';
            toggleButton.classList.add('toggle-button');
            document.body.insertBefore(toggleButton, heroSection);

            toggleButton.addEventListener('click', () => {
                heroSection.style.display = 
                    heroSection.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Video Player
        const video = document.querySelector('video');
        if (video) {
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }

        // Read More/Less Functionality
        const moreText = document.getElementById('more-text');
        const readMoreBtn = document.getElementById('readMoreBtn');
        
        if (readMoreBtn && moreText) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                moreText.classList.toggle('hidden');
                readMoreBtn.textContent = 
                    moreText.classList.contains('hidden') ? 'Read More' : 'Read Less';
            });
        }

        // Background Video Switcher
        const videos = document.querySelectorAll('.bg-video');
        if (videos.length > 0) {
            let currentVideo = 0;
            
            function switchVideo() {
                videos[currentVideo].classList.remove('active');
                currentVideo = (currentVideo + 1) % videos.length;
                videos[currentVideo].classList.add('active');
            }

            setInterval(switchVideo, 5000);
        }

    } catch (error) {
        console.error('Error in initialization:', error);
    }
});
// JavaScript to manage cart functionality

// Function to add products to the cart
function addToCart(productName, price, imageUrl) {
    // Get the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.productName === productName);

    if (existingProduct) {
        // If the product is already in the cart, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it as a new item
        cart.push({ productName, price, imageUrl, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, show a message or update a cart counter
    alert(`${productName} has been added to the cart.`);
}

// Function to load the cart items on the cart page
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");

    // Clear the cart container
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        // Create a cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.productName}">
            <h4>${item.productName}</h4>
            <span>Ksh ${item.price}</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.productName}', this.value)">
            <span>Total: Ksh ${item.price * item.quantity}</span>
            <i class="fa fa-trash" onclick="removeFromCart('${item.productName}')"></i>
        `;

        // Append to the cart container
        cartItemsContainer.appendChild(cartItem);
    });

    updateSubtotal();
}

// Function to update the quantity of an item
function updateQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find(item => item.productName === productName);

    if (product) {
        product.quantity = parseInt(newQuantity);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Refresh the cart
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.productName !== productName);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Refresh the cart
}

// Function to update the cart subtotal
function updateSubtotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    document.getElementById("cart-subtotal").innerHTML = `Subtotal: Ksh ${subtotal}`;
}
