const CAR_PRODUCTS = "cartProductsId";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
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

    if(localStorageItems == null) {
        arrayProductsId.push(idProducts);
        localStorage.setItem(CAR_PRODUCTS, arrayProductsId);
    } else {
        let productsId = localStorage.getItem(CAR_PRODUCTS);
        if(productsId.length > 0) {
            productsId += "," + idProducts;        
        }

        localStorage.setItem(CAR_PRODUCTS, productsId);
    }

}