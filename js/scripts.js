const CAR_PRODUCTS = "cartProductsId";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadProductsCart()
});

function getProducts() {
    const url = "../products.json";
   return fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        console.log("error", err)
    });
}

async function loadProducts() {
    let html = '';
    const products = await getProducts();
    
    products.forEach(product => {
        html += `
        <div class="col-3 product-container">
        <div class="card-product">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" />
        </div>
        <div class="card-body">
            <h5 class=card-title>${product.name}</h5>
            <p class="card-text">${product.extraInfo}</p>
            <p class="card-text">${product.price} $</p>
            <button type="button" class="btn btn-primary btn-cart" onClick=(addProductsCart(${product.id}))>Anadir al carrito</p>
        </div>
    
    </div>
        `;
        
    });
    document.getElementsByClassName("products")[0].innerHTML = html;
}

function openCloseCart() {
    const containerCart = document.getElementsByClassName("cart-products")[0];

    containerCart.classList.forEach(item => {
        if(item === "hidden") {
            containerCart.classList.remove("hidden");
            containerCart.classList.add("active");
        }

        if(item === "active") {
            containerCart.classList.remove("active");
            containerCart.classList.add("hidden");
        }
    });
}

function addProductsCart(idProducts) {
    let arrayProductsId = [];
    let localStorageItems = localStorage.getItem(CAR_PRODUCTS);

    if(localStorageItems === null) {
        arrayProductsId.push(idProducts);
        localStorage.setItem(CAR_PRODUCTS, arrayProductsId);
    } else {
        let productsId = localStorage.getItem(CAR_PRODUCTS);
        if(productsId.length > 0) {
            productsId += "," + idProducts;        
        }

        localStorage.setItem(CAR_PRODUCTS, productsId);
        
    }

    loadProductsCart();
}

async function loadProductsCart() {
    const products = await getProducts();
    let html = "";

    const localStorageItems = localStorage.getItem(CAR_PRODUCTS);

    if(!localStorageItems) {
       html = `
        <div class="cart-product empty">
            <p>Carrito vacio..</p>
        </div>
        `;
    } else {

    const idProductsSplit = localStorageItems.split(",");
    
    //Eliminar duplicados
    const idProductsCarts = Array.from(new Set(idProductsSplit));
    
    idProductsCarts.forEach(id => {
        products.forEach(product => {
            if(id == product.id) {
                const quantity = countDuplicatesId(id, idProductsSplit);
                const totalPrice = product.price * quantity;
                html += `
                    <div class="cart-product">
                    <img src="${product.image}" alt="${product.name}" />
                        <div class="cart-product-info">
                            <span class="quantity">${quantity}</span>
                            <p>${product.name}</p>
                            <p>${totalPrice.toFixed(2)}</p>
                            <p class="change-quantity">
                                <button onClick="decreaseQuantity(${product.id})">-</button>
                                <button onClick="increaseQuantity(${product.id})">+</button>
                            </p>
                            <p class="cart-product-delete">
                                <button onClick=(deleteProductsCart(${product.id}))>Eliminar</button>
                            </p>
                        </div>
                    </div>
                `
                ;
            }
        });
    });
}
    document.getElementsByClassName("cart-products")[0].innerHTML = html;
}

function countDuplicatesId(value, arrayIds) {
    let count = 0;
    arrayIds.forEach(id => {
        if(value == id) {
            count++;
        }
    });
    return count;
}

function deleteProductsCart(idProduct) {
    const idProductCart = localStorage.getItem(CAR_PRODUCTS);
    const arrayIdProductsCart = idProductCart.split(",");
    const resultIdDelete = deleteAllIds(idProduct, arrayIdProductsCart);

    if(resultIdDelete) {
        let count = 0;
        let idsString = "";

        resultIdDelete.forEach(id => {
            count++;
            if(count < resultIdDelete.length) {
                idsString += id + ",";
            } else {
                idsString += id;
            }
        });
        localStorage.setItem(CAR_PRODUCTS, idsString);
    }
    loadProductsCart();
}

function increaseQuantity(idProduct) {
    const idProductCart = localStorage.getItem(CAR_PRODUCTS);
    const arrayIdProductsCart = idProductCart.split(",");
    arrayIdProductsCart.push(idProduct);

    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id => {
        count++;
        if(count < arrayIdProductsCart.length) {
            idsString+= id + ",";
        } else {
            idsString += id;
        }
    });
    localStorage.setItem(CAR_PRODUCTS, idsString);
    loadProductsCart();
}

function decreaseQuantity(idProduct) {
    const idProductsCart = localStorage.getItem(CAR_PRODUCTS);
    const arrayIdProductsCart = idProductsCart.split(",");
  
    const deleteItem = idProduct.toString();
    let index = arrayIdProductsCart.indexOf(deleteItem);
    if (index > -1) {
      arrayIdProductsCart.splice(index, 1);
    }
  
    let count = 0;
    let idsString = "";
    arrayIdProductsCart.forEach(id => {
      count++;
      if (count < arrayIdProductsCart.length) {
        idsString += id + ",";
      } else {
        idsString += id;
      }
    });
    localStorage.setItem(CAR_PRODUCTS, idsString);
    loadProductsCart();
  }



function deleteAllIds(id, arrayIds) {
    return arrayIds.filter(itemId => {
      return itemId != id;
    });
  }