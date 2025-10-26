import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// funcion para calcular el precio segun el id
// lo hice con modulo porque la api no trae precios y tenia que inventarmelos
function getPrice(id) {
  const prices = [9.99, 12.50, 14.99, 17.50, 19.99, 22.50];
  return prices[id % prices.length];
}

// Pagina principal con categorias
function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(err => {
        console.log('error:', err)
        setError('Could not load categories')
        setLoading(false)
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>

  return (
    <div className="container">
      <h1>Restaurant Menu</h1>
      <p>Choose a category to see our dishes</p>
      
      <div className="grid">
        {categories.map(cat => (
          <Link key={cat.idCategory} to={`/category/${cat.strCategory}`} className="card">
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

// pagina de categoria con los platos
function Category() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      .then(res => res.json())
      .then(data => {
        setMeals(data.meals || []);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2>{name}</h2>
      <Link to="/" className="back-btn">Back</Link>
      
      <div className="grid">
        {meals.map(meal => (
          <Link key={meal.idMeal} to={`/meal/${meal.idMeal}`} className="card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <p className="price">${getPrice(meal.idMeal)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// pagina de detalle del plato
function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setMeal(data.meals[0]);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!meal) return <div className="error">Meal not found</div>

  // esto es para sacar los ingredientes de la api
  // porque vienen en formato raro (strIngredient1, strIngredient2, etc)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      // tuve que buscar como hacer esto en google
      ingredients.push(
        `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`
      );
    }
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      
      <div className="detail">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h1>{meal.strMeal}</h1>
        <p className="big-price">${getPrice(id)}</p>
        
        <div className="info">
          <span>Category: {meal.strCategory}</span>
          <span>Origin: {meal.strArea}</span>
        </div>

        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <p className="instructions">{meal.strInstructions}</p>
      </div>
    </div>
  );
}

// navbar(header) con links a las otras paginas
function Nav() {
  return (
    <nav>
      <Link to="/">Restaurant rockabilly 2</Link>
      <div>
        <Link to="/category/Seafood">Seafood</Link>
        <Link to="/category/Dessert">Dessert</Link>
        <Link to="/category/Pasta">Pasta</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/meal/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
