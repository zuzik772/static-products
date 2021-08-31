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
    document.querySelector(".brand").textContent = product.brandname;
    document.querySelector(".product-name").textContent = product.productdisplayname;
    // img
    //    < img src = "https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
    //    alt = "Sahara Team India Fanwear Round Neck Jersey" / >
    document.querySelector("img.product-image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    document.querySelector("img.product-image").alt = product.productdisplayname;

    document.querySelector(".price").textContent = `${product.price}DKK`;
    document.querySelector(".discount").textContent = `-${product.discount}%`;
    // document.querySelector(".discounted").textContent = ` ${Math.ceil(product.price * (1 - product.discount / 100))} DKK`;
}