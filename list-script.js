// LIST OF PRODUCTS 

const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        handleData(data)
    });

function handleData(data) {
    data.forEach(showProduct)
};


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
        myCLone.querySelector("div p").classList.add("onSale");
        myCLone.querySelector("div p").textContent = `-${product.discount}%`;
        myCLone.querySelector(".discounted").textContent = ` ${Math.ceil(product.price * (1 - product.discount / 100))} DKK`;

        // clone.querySelector("#off").textContent = `${Math.ceil(prod.price * (1 - prod.discount / 100))} kr.`;
    }
    // grab parent
    const parent = document.querySelector("main");
    // append
    parent.appendChild(myCLone);
}


/*
           <article class="smallProduct">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
                    alt="Sahara Team India Fanwear Round Neck Jersey" />
                <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
                <p class="subtle">Tshirts | Nike</p>
                <p class="price"><span>Prev.</span> DKK 1595,-</p>
                <div class="discounted">
                    <p>Now DKK 1560,-</p>
                    <p>-34%</p>
                </div>
                <a href="product-page.html">Read More</a>
            </article>

*/