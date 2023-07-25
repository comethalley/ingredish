document.getElementById("submit").onclick = function () {
  const query = document.getElementById("search").value;
  const ingredients = query.split(",").map((ingredient) => ingredient.trim());

  // Construct the ingredients part of the URL
  const ingredientsString = ingredients.join(",+");

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=27b78a980d26472eb17d8ee92d95dc71&ingredients=${query}`
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((recipe) => {
        let list = "<p>";
        recipe.missedIngredients.forEach((ingredient) => {
          list += `${ingredient.original},`;
        });
        list += "</p>";

        const markup = `<div class="recipe-card">
        <div class="card-image" ><img src="${recipe.image}" class="recipe-img"/></div>
        <div class="card-title"><h3>${recipe.title}</h3></div>
        <div class="card-info"><h4>Ingredients</h4>${list}</div>
        <a href="recipe.html/${recipe.id}">See the recipe</a>
      </div>`;

        document
          .getElementById("recipe")
          .insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
};
