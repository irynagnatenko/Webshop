let productsIn = [];

// check localStorage and initialize the content of the cartContent by sending the key "cartItems"
let cartContent = localStorage.getItem("cartItems");
if (cartContent) {
  productCart = JSON.parse(cartContent);
} else {
  productCart = [];
}

// find a product in the cart by it's id
function getProduct(id) {
  var returnProduct;
  productsIn.forEach((element) => {
    if (element.id == id) {
      returnProduct = element;
    }
  });
  return returnProduct;
}

// a function to update local storage (cart) after each operation
function syncCart() {
  localStorage.setItem("cartItems", JSON.stringify(productCart));
}

// add a new product to the cart
function addToCart(id) {
  var productToAdd = getProduct(id);
  var isAlreadyInCart = false;
  productCart.forEach((element) => {
    if (element.id == id) {
      isAlreadyInCart = true;
      productToAdd = element;
    }
  });
  if (!isAlreadyInCart) {
    productToAdd.quantity = 1;
    productCart.push(productToAdd);
  } else {
    productToAdd.quantity += 1;
  }
  syncCart();
}

// Increase the quantitty of the product in the cart
function addOneProduct(product) {
  window.location.reload();
  let cart = JSON.parse(localStorage.getItem("cartItems"));
  let increase = cart.find((element) => element.id == product);
  increase.quantity += 1;
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

//  reduce the quantity of the producvt in the cart
function removeOneProduct(product) {
  window.location.reload();
  let cart = JSON.parse(localStorage.getItem("cartItems"));
  let decrease = cart.find((element) => element.id == product);
  if (decrease.quantity !== 0) {
    decrease.quantity += -1;
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }
  // if the quantity  is zero, remove the product completely
  else remove(decrease.id);
}

// remove the item entirely
function remove(id) {
  productCart = productCart.filter((element) => {
    if (element.id !== id) return true;
  });
  syncCart();
}

//empty whole cart
function emptyCart() {
  productCart = [];
  syncCart();
}

// Render all products in an HTML table
function renderCart() {
  const getProducts = JSON.parse(localStorage.getItem("cartItems"));

  getProducts.forEach((element) => {
    document.getElementById(
      "productsInCart"
    ).innerHTML += `<tr class="table-default">
        <td scope="row">${element.title}</td>
        <td scope="row">${element.price} $</td>
        <td>
        <button type="button" class="btn btn-success" onclick="addOneProduct(${
          element.id
        })">+</button>
        <button type="button" class="btn btn-light">${element.quantity}</button>
        <button type="button" class="btn btn-success" onclick="removeOneProduct(${
          element.id
        })">-</button>
        </td>
        <td id="total">${(element.price * element.quantity).toFixed(
      2
    )} $</td> 
    
    </tr>`;
  });
}
