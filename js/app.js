const apiUrl = "https://api.spoonacular.com";
const endpoint = "recipes/findByIngredients";
const apiKey = "27b78a980d26472eb17d8ee92d95dc71";

document.getElementById("submit").onclick = function () {
  const query = document.getElementById("search").value;
  const ingredients = query.split(",").map((ingredient) => ingredient.trim());

  // Construct the ingredients part of the URL
  const ingredientsString = ingredients.join(",+");

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
          <a href="pages/recipe.html?${recipe.id}">See the recipe</a>
        </div>`;

        recipeContainer.insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
};

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
