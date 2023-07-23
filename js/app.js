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
        const title = `<h1>${recipe.title}</h1>`;
        const img = `<img src="${recipe.image}" />`;

        let ingredients = "<ul>";
        recipe.missedIngredients.forEach((ingredient) => {
          ingredients += `<li>${ingredient.name}</li>`;
        });
        ingredients += "</ul>";

        document.getElementById("recipe-name").innerHTML = title;
        document.getElementById("recipe-img").innerHTML = img;
        document.getElementById("recipe-ingredients").innerHTML = ingredients;
      });
    })
    .catch((error) => console.log(error));
};
