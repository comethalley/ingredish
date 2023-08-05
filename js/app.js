const apiUrl = "https://api.spoonacular.com";
const endpoint = "recipes/findByIngredients";
const complexSearch = "complexSearch";
const apiKey = "27b78a980d26472eb17d8ee92d95dc71";

function searchIngredients(parameterName) {
  const ingredients = parameterName
    .split(" ")
    .map((ingredient) => ingredient.trim());

  // Construct the ingredients part of the URL
  const ingredientsString = ingredients.join(",+");

  console.log(ingredientsString);

  fetch(
    `${apiUrl}/${endpoint}?apiKey=${apiKey}&ingredients=${ingredientsString}`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const recipeContainer = document.getElementById("recipe");
      recipeContainer.innerHTML = ""; // Clear previous results before appending new ones

      data.forEach((recipe) => {
        let list = "<p>";
        recipe.missedIngredients.forEach((ingredient) => {
          list += `${ingredient.original},`;
        });
        list += "</p>";

        const markup = `<div class="recipe-card">
          <img src="${recipe.image}" class="recipe-img"/>
          <div class="card-title"><h3>${recipe.title}</h3></div>
          <div class="card-info"><h5>Ingredients</h5>${list}</div>
          <a href="pages/recipe.html?search=${recipe.id}">See the recipe</a>
        </div>`;

        recipeContainer.insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
}

function getParameter(parameterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

function getRecipe(parameterName) {
  const recipe = parameterName;
  console.log(recipe);
  fetch(`${apiUrl}/recipes/${recipe}/information?apiKey=${apiKey}`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);

      let list = "<div class ='ingredients-grid'>";
      data.extendedIngredients.forEach((ingredient) => {
        list += `<div class ='ingredients-list'><img src="https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}" /><p>${ingredient.original}</p></div>`;
      });
      list += "</div>";

      const markup = `<div class="image"><h1>${data.title}</h1><hr><div class="recipe-img"><img src="${data.image}" /><span>Image:<a href="${data.sourceUrl}">${data.sourceName}</a></span></div></div>
      <div class="about"><p>${data.summary}</p></div>
      <div class="ingredients"><h2>Ingredients</h2>${list}</div>
      <div class="instruction"><h2>Instruction</h2><p>${data.instructions}</p></div>`;

      document.getElementById("grid").insertAdjacentHTML("beforeend", markup);
      document.getElementById("title").innerHTML = data.title + " | Ingredish";
    })
    .catch((error) => console.log(error));
}

function searchRecipe(parameterName) {
  const searchRecipe = parameterName;
  document.getElementById("result").innerHTML =
    "Result based on " + '"' + searchRecipe + '"';
  console.log(searchRecipe);
  fetch(
    `${apiUrl}/recipes/${complexSearch}?apiKey=${apiKey}&query=${searchRecipe}`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);

      data.results.forEach((query) => {
        const markup = `<div class="recipe-card">
          <img src="${query.image}" class="recipe-image"/>
          <div class="card-title"><h3>${query.title}</h3></div>
          <a href="recipe.html?search=${query.id}">See the recipe</a>
        </div>`;

        document
          .getElementById("query-container")
          .insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
}

//for searching ingredients
function handleFormSubmission(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;

  if (searchValue) {
    // Update the URL query string with the entered ingredients
    const parameters = new URLSearchParams(window.location.search);
    parameters.set("search", searchValue);
    const newUrl = `${window.location.pathname}?${parameters.toString()}`;
    window.history.pushState(null, null, newUrl);

    // Fetch recipes based on the entered ingredients
    searchIngredients(searchValue);
  }
}

//for searching recipe
function handleSearchQuerySubmission(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;

  if (searchValue) {
    // Update the URL query string with the entered ingredients
    const parameters = new URLSearchParams(window.location.search);
    parameters.set("search", searchValue);
    const newUrl = `${window.location.pathname}?${parameters.toString()}`;
    window.history.pushState(null, null, newUrl);

    // Fetch recipes based on the entered by users

    window.location.href = "/pages/search.html" + window.location.search;
  }
}

//loading function
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader-hidden");

  loader.addEventListener("transitionend", () => {
    if (document.body.contains(loader)) {
      document.body.removeChild(loader);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const recipeId = getParameter("search");

  getRecipe(recipeId);
  searchRecipe(recipeId);
});
