"use strict"

const elHeaderLike = document.querySelector(".like");
const elCategories = document.querySelector(".categories__list");
const elProducts = document.querySelector(".products__list");
const elProductsAll = document.querySelector(".products__top-desc-blue");
const elForm = document.querySelector(".header__form");
const elSelect = document.querySelector(".header__select");
const elInput = document.querySelector(".header__input");
const elbookmark = document.querySelector(".bookmark");

elHeaderLike.addEventListener("click", () => {
  elHeaderLike.classList.toggle("header__like")
})

elbookmark.addEventListener("click", () => {
  console.log("dsd");
})

const renderSelect = function(item){
  const uniqueSelect = [];

  item.forEach(categors => {
    if(!uniqueSelect.includes(categors.categories)){
      uniqueSelect.push(categors.categories)
    }
  })

  uniqueSelect.forEach(element => {
    const newOption = document.createElement("option");

    newOption.textContent = element;

    elSelect.appendChild(newOption)
  })
}

renderSelect(products)

const renderProducts = function(prods, element){
  prods.forEach(item => {
    const newProdsItem = document.createElement("li");
    const newProdsImg = document.createElement("img");
    const newProdsDiv = document.createElement("div");
    const newProdsHeading = document.createElement("h3");
    const newProdsTitle = document.createElement("p");
    const newProdsPrice = document.createElement("p");
    const newProdsBtn = document.createElement("a");
    const newProdsBtnView = document.createElement("a");

    newProdsItem.style.width = "18rem";
    newProdsItem.style.marginBottom = "2rem";
    newProdsItem.setAttribute("class", "card products__item")
    newProdsImg.setAttribute("src", item.poster);
    newProdsImg.setAttribute("class", "card-img-top");
    newProdsDiv.setAttribute("class", "card-body");
    newProdsHeading.setAttribute("class", "card-title");
    newProdsTitle.setAttribute("class", "card-text");
    newProdsTitle.style.fontWeight = "600"
    newProdsTitle.style.fontSize = "20px";
    newProdsTitle.style.color = "#FF9900"
    newProdsPrice.setAttribute("class", "card-text");
    newProdsPrice.style.fontWeight = "600"
    newProdsPrice.style.fontSize = "20px"
    newProdsPrice.style.color = "dodgerblue";
    newProdsBtn.setAttribute("class", "btn btn-primary")
    newProdsBtnView.setAttribute("class", "btn btn-outline-primary ms-3")

    newProdsHeading.textContent = item.categories;
    newProdsTitle.textContent = item.title;
    newProdsPrice.textContent = item.price;
    newProdsBtn.textContent = "Add to Cart"
    newProdsBtnView.textContent = "Quick view"

    element.appendChild(newProdsItem);
    newProdsItem.appendChild(newProdsImg);
    newProdsItem.appendChild(newProdsDiv);
    newProdsDiv.appendChild(newProdsHeading);
    newProdsDiv.appendChild(newProdsTitle);
    newProdsDiv.appendChild(newProdsPrice);
    newProdsDiv.appendChild(newProdsBtn);
    newProdsDiv.appendChild(newProdsBtnView);
  })
}

const renderCategories = function(categors, htmlElement){
  const unique = [];

  categors.forEach(item => {
    if(!unique.includes(item.categories)){
      unique.push(item.categories)
    }
  })

  unique.forEach(item => {
    const newCategoriesItem = document.createElement("li");

    newCategoriesItem.textContent = item;

    newCategoriesItem.classList.add("categories__item")

    htmlElement.appendChild(newCategoriesItem);
  })
}

renderCategories(products, elCategories);
renderProducts(products, elProducts);

elCategories.addEventListener("click", (evt) => {
  const foundCategories = evt.target.textContent;

  const filterCategories = products.filter(item => item.categories === foundCategories);

  elProducts.innerHTML = null;

  renderProducts(filterCategories, elProducts);
})

elProductsAll.addEventListener("click", () => {
  elProducts.innerHTML = null;

  renderProducts(products, elProducts)
})

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if(elInput.value){
    const inputValue = elInput.value[0].toUpperCase() + elInput.value.slice(1).toLowerCase();
    elInput.value = null;

    const filteredInputValue = products.filter(item => item.categories === inputValue);

    elProducts.innerHTML = null;

    renderProducts(filteredInputValue, elProducts);

  } else if(elSelect.value){
    const selectValue = elSelect.value;

    const filterSelectValue = [];

    products.forEach(item => {
      if(item.categories.includes(selectValue)){
        filterSelectValue.push(item);
      }
    })

    elProducts.innerHTML = null;

   renderProducts(filterSelectValue, elProducts);

   if(selectValue === "all"){
    renderProducts(products, elProducts);
   }
  }
})