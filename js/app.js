document.getElementById("submit").onclick = function () {
  const query = document.getElementById("search").value;

  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=27b78a980d26472eb17d8ee92d95dc71&ingredients=${query}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((recipe) => {
        let ingredients = "<p>";
        recipe.missedIngredients.forEach((ingredient) => {
          ingredients += `${ingredient.name},`;
        });
        ingredients += "</p>";

        const markup = `<div class="recipe-card">
        <div class="card-image" ><img src="${recipe.image}"/></div>
        <div class="card-title"><h1>${recipe.title}</h1></div>
        <div class="card-info">${ingredients}</div>
        <a href="recipe.html/${recipe.id}">See the recipe</a>
      </div>`;

        document
          .getElementById("recipe")
          .insertAdjacentHTML("beforeend", markup);
      });
    })
    .catch((error) => console.log(error));
};
