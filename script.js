// PRODUCT PAGE
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// fetch the data
const url = "https://kea-alt-del.dk/t7/api/products/" + id;
fetch(url)
    .then(res => res.json())
    .then(data => showProduct(data));
// populate the page
function showProduct(product) {
    console.log(product);
    document.querySelector(".brand-bio").textContent = product.brandbio;
    document.querySelector(".product-name").textContent = product.productdisplayname;
    document.querySelector(".category").textContent = product.category;
    document.querySelector(".subcategory").textContent = product.subcategory;
    document.querySelector(".season").textContent = product.season;
    document.querySelector(".usage-type").textContent = product.articletype;
    document.querySelector(".gender").textContent = product.gender;
    document.querySelector(".type").textContent = product.usagetype;
    document.querySelector(".brand").textContent = product.brandname;

    document.querySelector("img.product-image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    document.querySelector("img.product-image").alt = product.productdisplayname;

    document.querySelector(".price").textContent = `${product.price}DKK`;
    document.querySelector(".discount").textContent = `-${product.discount}%`;
    document.querySelector(".discounted").textContent = `Now: ${Math.ceil(product.price * (1 - product.discount / 100))} DKK`;
    if (product.discount) {
        document.querySelector(".price").textContent = `Before: ${product.price}DKK`;
        document.querySelector(".price").style.color = "var(--dark-color3)";
        document.querySelector(".discount").textContent = `-${product.discount}%`;
    } else {
        document.querySelector(".discount").textContent = ``;
        document.querySelector(".discount").remove("onSale");
        document.querySelector(".discounted").textContent = ` `;
    }
}