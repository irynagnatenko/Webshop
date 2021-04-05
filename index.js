
function getAllProducts() {
  fetch("https://webacademy.se/fakestore/")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((element) => {
        let newProduct = {
          id: element.id,
          title: element.title,
          description: element.description,
          image: element.image,
          price: element.price,
          category: element.category,
          quantity: 0,
        };
        productsIn.push(newProduct);
        document.getElementById(
          "products"
        ).innerHTML += `<div class="itemcard bg-light" style="max-width: 20rem;height: 100%" > 
               <div class="col border border-info " >
                <h3 class="text-center text-primary"> ${element.title}</h3>
                <div class="text-center text-primary">
                  <h4 class="text-center" > ${element.category} </h4>
                  <img class="img-justify" style="max-width: 15rem;"src="${
                    element.image
                  }" alt="Dummy image" />
                  <p class="description text-justify" style="padding: 2px;" > ${
                    element.description
                  } </p>
                  <h4 class="text-center text-danger"> ${element.price.toFixed(
                    2
                  )} $</h4>
                  <button type="button" class="btn btn-outline-info" onclick="addToCart(${
                    element.id
                  })" > Add to cart </button>
                </div>
              </div>`;
      })
    );
}




 