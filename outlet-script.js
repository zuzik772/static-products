// LIST OF PRODUCTS 
// const urlParams = new URLSearchParams(window.location.search);
const discount = urlParams.get("discount");
const urlDiscount = "https://kea-alt-del.dk/t7/api/products/?discount";

console.log(urlDiscount);
fetch(urlDiscount)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        const productsWithDiscount = data.filter(product => product.discount !== null);
        handleDiscountData(productsWithDiscount)
    });

function handleDiscountData(data) {
    data.forEach(showDiscountedProduct)
    updateDiscountHeader();
};

function updateDiscountHeader() {
    document.querySelector("h2.gender").textContent = "Outlet";
}

function showDiscountedProduct(product) {
    // grab the template
    const myTemplate = document.querySelector("template").content;
    // clone it
    const myCLone = myTemplate.cloneNode(true);
    // change content
    myCLone.querySelector("a").setAttribute("href", "product-page.html?id=" + product.id);

    myCLone.querySelector(".subtle").textContent = `${product.articletype} | ${product.brandname}`;
    myCLone.querySelector("h3").textContent = `${product.productdisplayname}`;
    myCLone.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

    myCLone.querySelector(".price").textContent = `Before: ${product.price} DKK`;
    myCLone.querySelector("div p").classList.add("onSale");
    myCLone.querySelector("div p").textContent = `-${product.discount}%`;
    myCLone.querySelector(".discounted").textContent = `Now: ${Math.ceil(product.price * (1 - product.discount / 100))} DKK`;
    // grab parent
    const parent = document.querySelector("main");
    // append
    parent.appendChild(myCLone);
}