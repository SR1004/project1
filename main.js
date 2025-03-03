const foods = [
    {
        name: "Thattu Idly",
        image: "thattu_idly.jpg",
        description: "A famous and hygienic dish from Tamil Nadu.",
        price: "Rs. 20/-",
        location: "Chennai, Tamil Nadu",
        rating: 5
    },
    {
        name: "Kalan",
        image: "kalan.jpg",
        description: "Tasty and fresh, available at an affordable price.",
        price: "Rs. 30/-",
        location: "Mylapore, Chennai",
        rating: 4
    },
    {
        name: "Parota",
        image: "parota.jpg",
        description: "A crispy and layered delight from South India.",
        price: "Rs. 15/-",
        location: "Coimbatore, Tamil Nadu",
        rating: 5
    }
];

const foodList = document.getElementById("foodList");
const orderList = document.getElementById("orderList");
const orderSummary = document.getElementById("orderSummary");

// Populate the food list dynamically
foods.forEach((food, index) => {
    let foodItem = document.createElement("div");
    foodItem.className = "food-item";
    foodItem.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <h2>${food.name}</h2>
        <p>${food.description}</p>
        <div class="stars">${"★".repeat(food.rating)}${"☆".repeat(5 - food.rating)}</div>
        <h3>${food.price}</h3>
        <div class="button-group">
            <button onclick="openModal(${index})">More Info</button>
            <button onclick="orderFood('${food.name}', '${food.price}')">Order</button>
        </div>
    `;
    foodList.appendChild(foodItem);
});

// Show More Info Modal
function openModal(index) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <h2>${foods[index].name}</h2>
        <img src="${foods[index].image}" alt="${foods[index].name}" style="width: 100%; height: 200px; border-radius: 10px;">
        <p>${foods[index].description}</p>
        <h3>${foods[index].price}</h3>
        <p>Available at: ${foods[index].location}</p>
    `;

    modal.style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Search Food Functionality
function searchFood() {
    let input = document.getElementById("searchbar").value.toLowerCase();
    let items = document.getElementsByClassName("food-item");

    for (let i = 0; i < items.length; i++) {
        let name = foods[i].name.toLowerCase();
        items[i].style.display = name.includes(input) ? "block" : "none";
    }
}

// Add food to order summary
function orderFood(foodName, foodPrice) {
    let orderItem = document.createElement("li");
    orderItem.innerHTML = `${foodName} - <b>${foodPrice}</b>`;
    orderList.appendChild(orderItem);
    orderSummary.style.display = "block";
}

// Checkout Button
function checkout() {
    alert("Your order has been placed! Thank you for ordering.");
    orderList.innerHTML = "";
    orderSummary.style.display = "none";
}
