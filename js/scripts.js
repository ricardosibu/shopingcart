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
    console.log("Cargando data inicial");
    const products = await getProducts();
    console.log(products);
}