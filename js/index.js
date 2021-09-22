async function getRandomCocktail() {
    let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    let data = await response.json();
    return data;
}

function getCocktailHtml(cocktail) {
    let ingredients = []
    Object.keys(cocktail).filter((key) => {
        if (key.startsWith('strIngredient')) {
            if (cocktail[key]) {
                ingredients.push(cocktail[key])
            }
        }
    })
    console.log(ingredients.join(''))
    return `
        <div class='cocktail-item'>
            <img class='cocktail-thumbnail' src='${cocktail.strDrinkThumb}'></img>
            <div class='cocktail-info'>
                <p class='cocktail-name'>Name ... ${cocktail.strDrink}</p>
                <p class='cocktail-category'>Category ... ${cocktail.strCategory}</p>
                <p class='cocktail-glass'>Drink from ... ${cocktail.strGlass}</p>
                <p class='ingredients'>Ingredients ... <span class='ingredient-items'>${ingredients.join(', ')}</span></p>
                <p class='instructions'>Instructions ... ${cocktail.strInstructions}</p>
            </div>
        </div>
    `
}

document.getElementById('random-button').addEventListener('click', function() {
    getRandomCocktail().then(
        (data) => {
            document.querySelector('.cocktails-container').innerHTML = getCocktailHtml(data.drinks[0])
        }
    )
})
