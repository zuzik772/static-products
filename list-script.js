// LIST OF PRODUCTS 
const urlParams = new URLSearchParams(window.location.search);
const gender = urlParams.get("gender");
const url = "https://kea-alt-del.dk/t7/api/products/?gender=" + gender;

// const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleData(data)
    });

function handleData(data) {
    data.forEach(showProduct)
    if (gender) {
        updateHeader();
    }
};

function updateHeader() {
    document.querySelector("h2.gender").textContent = `${gender}`;
}

function showProduct(product) {
    console.log(product);
    // grab the template
    const myTemplate = document.querySelector("template").content;
    // clone it
    const myCLone = myTemplate.cloneNode(true);
    // change content
    myCLone.querySelector("a").setAttribute("href", "product-page.html?id=" + product.id);
    myCLone.querySelector(".price").textContent = `${product.price} DKK`;
    // myCLone.querySelector(".discounted").textContent = `${product.discount}`;
    myCLone.querySelector(".subtle").textContent = `${product.articletype} | ${product.brandname}`;
    myCLone.querySelector("h3").textContent = `${product.productdisplayname}`;
    myCLone.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    if (product.soldout) {
        myCLone.querySelector("article").classList.add("soldOut");
    }
    if (product.discount) {
        myCLone.querySelector(".price").textContent = `Before: ${product.price} DKK`;
        myCLone.querySelector("div p").classList.add("onSale");
        myCLone.querySelector("div p").textContent = `-${product.discount}%`;
        myCLone.querySelector(".discounted").textContent = `Now: ${Math.ceil(product.price * (1 - product.discount / 100))} DKK`;

    }
    // grab parent
    const parent = document.querySelector("main");
    // append
    parent.appendChild(myCLone);
}