"use strict"

const elHeaderLike = document.querySelector(".like");
const elCategories = document.querySelector(".categories__list");
const elProducts = document.querySelector(".products__list");
const elProductsAll = document.querySelector(".products__top-desc-blue");
const elForm = document.querySelector(".header__form");
const elSelect = document.querySelector(".header__select");
const elInput = document.querySelector(".header__input");
const elModal = document.querySelector(".modal");
const elBookmark = document.querySelector(".block");
const elOverlay = document.querySelector(".overlay");
const elCloseBtn = document.querySelector(".close-modal");

const localStorage = JSON.parse(window.localStorage.getItem("bookmark"))

const bookmark = localStorage || []

elHeaderLike.addEventListener("click", () => {
  elHeaderLike.classList.toggle("header__like")
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
    newProdsBtn.classList.add("bookmark-btn");
    newProdsBtn.dataset.bookmarkId = item.id;
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

const renderBookmark = function(array, html) {
  if(bookmark.length > 0){
    elBookmark.classList.add("active")
  }

  array.forEach(item => {
    const newCloseBtn = document.createElement("button");
    const newProdsItem = document.createElement("li");
    const newProdsImg = document.createElement("img");
    const newProdsDiv = document.createElement("div");
    const newProdsHeading = document.createElement("h3");
    const newProdsTitle = document.createElement("p");
    const newProdsPrice = document.createElement("p");
    const newProdsBtn = document.createElement("a");
    const newProdsBtnView = document.createElement("a");
    const newProdsRemove = document.createElement("button");

    newCloseBtn.classList.add("close-modal")

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
    newProdsBtnView.setAttribute("class", "btn btn-outline-primary ms-3");
    newProdsRemove.setAttribute("class", "btn btn-danger ms-5 mt-3")

    newProdsHeading.textContent = item.categories;
    newProdsTitle.textContent = item.title;
    newProdsPrice.textContent = item.price;
    newProdsBtn.textContent = "Add to Cart"
    newProdsBtn.classList.add("bookmark-btn");
    newProdsBtn.dataset.bookmarkId = item.id;
    newProdsBtnView.textContent = "Quick view";
    newProdsRemove.textContent = "Remove"

    newProdsRemove.dataset.removeBookmark = item.id;

    html.appendChild(newProdsItem);
    html.appendChild(newCloseBtn);
    newProdsItem.appendChild(newProdsImg);
    newProdsItem.appendChild(newProdsDiv);
    newProdsDiv.appendChild(newProdsHeading);
    newProdsDiv.appendChild(newProdsTitle);
    newProdsDiv.appendChild(newProdsPrice);
    newProdsDiv.appendChild(newProdsBtn);
    newProdsDiv.appendChild(newProdsBtnView);
    newProdsDiv.appendChild(newProdsRemove);
  })
}

renderBookmark(bookmark, elModal)

elProducts.addEventListener("click", (evt) => {
  if(evt.target.matches(".bookmark-btn")){
    const foundBookmark = evt.target.dataset.bookmarkId;
    const findBookmark = products.find(item => item.id === foundBookmark);

    if(!bookmark.includes(findBookmark)){
      bookmark.push(findBookmark)
    }


    elModal.innerHTML = null;

    window.localStorage.setItem("bookmark", JSON.stringify(bookmark));

    renderBookmark(bookmark, elModal)
  }
})


function open() {
  elModal.classList.remove("d-none");
  elOverlay.classList.remove("d-none")
}

function close() {
  elModal.classList.add("d-none");
  elOverlay.classList.add("d-none")
}

elBookmark.addEventListener("click", open);

elOverlay.addEventListener("click", close);

elModal.addEventListener("click", (evt) => {
  if(evt.target.matches(".close-modal")){
    close()
  }
})

document.addEventListener("keydown", (evt) => {
  if(evt.keyCode === 27){
    if(!elModal.classList.contains("d-none")){
      close()
    }
  }
})

elModal.addEventListener("click", (evt) => {
  if(evt.target.matches(".btn-danger")){
    const bookmarRemoveId = evt.target.dataset.removeBookmark;
    const foundBookmarkRemove = bookmark.findIndex(item => item.id === bookmarRemoveId);

    elModal.innerHTML = null;

    bookmark.splice(foundBookmarkRemove, 1);

    window.localStorage.setItem("bookmark", JSON.stringify(bookmark))

    if(bookmark.length === 0){
      elBookmark.classList.remove("active");
      window.localStorage.removeItem("bookmark")
    }

    renderBookmark(bookmark, elModal)
  }
})