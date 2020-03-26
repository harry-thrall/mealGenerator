const get_meal_btn = document.getElementById('get_meal');
const get_cocktail_btn = document.getElementById('get_cocktail');
const get_both_btn = document.getElementById('get_both');
const meal_container = document.getElementById('meal');
const drink_container = document.getElementById('drink');

get_meal_btn.addEventListener('click', () => {
  //Clear cocktails div
  drink_container.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
      createMeal(response.meals[0]);
    })
    .catch(e => {
      console.warn(e);
    });
});

get_cocktail_btn.addEventListener('click', () => {
  //Clear meal div
  meal_container.innerHTML = '';

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
      createDrink(response.drinks[0]);
    })
    .catch(e => {
      console.warn(e);
    });
});

get_both_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
      createMeal(response.meals[0]);
    })
    .catch(e => {
      console.warn(e);
    });

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
      createDrink(response.drinks[0]);
    })
    .catch(e => {
      console.warn(e);
    });
});

const createMeal = meal => {
	const ingredients = [];

	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			// Stop if there are no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${
					meal.strCategory
						? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
						: ''
				}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${
					meal.strTags
						? `<p><strong>Tags:</strong> ${meal.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
			meal.strYoutube
				? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
				: ''
		}
	`;

	meal_container.innerHTML = newInnerHTML;
};

//Code for cocktail generation

const createDrink = drink => {
	const ingredients = [];

	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (drink[`strIngredient${i}`]) {
			ingredients.push(
				`${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
			);
		} else {
			// Stop if there are no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${drink.strDrinkThumb}" alt="Drink Image">
				${
					drink.strCategory
						? `<p><strong>Category:</strong> ${drink.strCategory}</p>`
						: ''
				}
				${drink.strAlcoholic ? `<p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>` : ''}
				${
					drink.strTags
						? `<p><strong>Tags:</strong> ${drink.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${drink.strDrink}</h4>
				<p>${drink.strInstructions}</p>
			</div>
		</div>
	`;

	drink_container.innerHTML = newInnerHTML;
};
