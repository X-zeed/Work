const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');

// Base API URL
const BASE_URL = '/api';

// Fetch and display all products
function fetchProducts() {
  fetch(`${BASE_URL}/productAll`)
    .then(response => response.json())
    .then(data => {
      productList.innerHTML = ''; // Clear existing list

      if (data.length === 0) {
        productList.innerHTML = '<li>No products found</li>';
        return;
      }

      data.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${product.name} - ${product.price}
          <button class="edit" onclick="editProduct('${product._id}', '${product.name}', '${product.price}')">Edit</button>
          <button class="delete" onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// Add new product
productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = productNameInput.value.trim();
  const price = productPriceInput.value.trim();

  if (!name || !price) return;

  fetch(`${BASE_URL}/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  })
    .then(response => response.json())
    .then(() => {
      fetchProducts(); // Refresh the list
      productNameInput.value = '';
      productPriceInput.value = '';
    })
    .catch(error => {
      console.error('Error adding product:', error);
    });
});

// Edit product
function editProduct(id, currentName, currentPrice) {
  const newName = prompt('Edit Product Name:', currentName);
  const newPrice = prompt('Edit Product Price:', currentPrice);

  if (!newName || !newPrice) return;

  fetch(`${BASE_URL}/product/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, detail: newPrice })
  })
    .then(() => fetchProducts()) // Refresh the list
    .catch(error => {
      console.error('Error editing product:', error);
    });
}

// Delete product
function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  fetch(`${BASE_URL}/product/${id}`, { method: 'DELETE' })
    .then(() => fetchProducts()) // Refresh the list
    .catch(error => {
      console.error('Error deleting product:', error);
    });
}

// Initial fetch of products
fetchProducts();

document.getElementById('scr1').style.display="none"
function showscr(){
  document.getElementById('scr1').style.display="block"
}

// Function to show Main Content
function showMainContent() {
  // Hide Welcome Screen
  document.getElementById("welcome-screen").style.display = "none";
  // Show Main Content
  document.getElementById("scr1").style.display = "block";
}

// Default view: show Welcome Screen
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("welcome-screen").style.display = "block";
  document.getElementById("scr1").style.display = "none";
});

// Modal login