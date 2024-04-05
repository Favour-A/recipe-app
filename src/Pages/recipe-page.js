import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBowlFood } from "react-icons/fa6";


import '../App.css';
import '../styles/recipe.css';
import '../styles/home.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import HomePage from './home';
import axios from 'axios';
import FoodRecipes from "./random-recipes";
import '../styles/home.css';


const RecipePage = () => {
  const [ recipe, setRecipe ] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMealsBySearch = () => {
      
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

    fetch(endpoint)
        .then(response => {
           
            if (response.ok) {
                return response.json();
            }
            
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setMeals(data.meals || []); 
           
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
};

const handleSearchInputChange = event => {
  setSearchQuery(event.target.value);
  fetchMealsBySearch();
};

const handleSearchButtonClick = () => {
  fetchMealsBySearch();
};
const handleSelectedMeal = (meal) => {
  setSelectedMeal(meal);

}


    const HandleBackHome = () => {
        navigate('/');
    };

    const HandleSelectedMeal = async (meal) => {
        

        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + meal.idMeal);
          

        setSelectedMeal(response.data.meals[0]);
    };

    const { id } = useParams();

    useEffect(() => {
      const getRecipe = async () => {
        const response = await axios.get('https://themealdb.com/api/json/v1/1/filter.php?c=' + id);
          
        setRecipe(response.data.meals);
        
      };

      getRecipe();
     
  }, []);

    return (
        <Container id='container'>
            <Row>
            <Col>
                    <div id='heading'>
                        
                        <button onClick={ HandleBackHome }><span> < GoArrowRight /></span> Chefs Academy</button>
                        
                    </div>

                </Col>
                <Col>
                 <div id='search'>
                  <input type="text" value={searchQuery}
                onChange={handleSearchInputChange} placeholder="Search for a recipe"  className="search-input"/>
                 <button onClick={handleSearchButtonClick} className="search-button"><IoSearchSharp /></button>
                  <div className="meal-container">
                   {searchQuery.trim() !== '' ? (
                    meals.map(meal => (
                      <div key={meal.idMeal} className="meal-item" >                  
                      <h5 data-bs-toggle="modal" data-bs-target="#foodDetails" onClick={() => handleSelectedMeal(meal)}>{meal.strMeal}</h5>

                      </div>
                        
                    ))
                ) : (
                    <p className="empty-search-message">Enter a search query to find recipes.</p>
                )}
             </div>
            </div>
           </Col>
                
            </Row>
            <Row className='cardsContainer' >
            {searchQuery.trim() === '' && recipe.map((meal) => (
          
          <Col key={meal.idMeal}>
            <Card id='recipeCard' >
              <Card.Img variant="top" src= {meal.strMealThumb} />
              <Card.Body>
                <Card.Title>{meal.strMeal}</Card.Title>
                
                <Button type='button' className="btn btn-outline-primary btn-sm myBtn" data-bs-toggle="modal" data-bs-target="#foodDetails" onClick={() => HandleSelectedMeal(meal)} > < MdKeyboardDoubleArrowRight /></Button>
              </Card.Body>
            </Card>
          </Col> 
          ))}
         
         
         
          
    
        </Row>
        <Row>
        <footer>
          <p>© 2024 Chefs Academy. All rights reserved.</p>
        </footer>
        </Row>

        <div id='foodDetails'className="modal fade" tabindex="-1" data-bs-backdrop="false" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
  <div className="modal-content shadow">
    <div className="modal-header  bg-primary bg-gradient text-white">
      <h5 className="modal-title">How To Prepare <span>{selectedMeal !== null ? selectedMeal.strMeal : ''}</span></h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      <h3>{selectedMeal !== null ? selectedMeal.strMeal : ''}</h3>
      <img id='modalImage' src={selectedMeal !== null ? selectedMeal.strMealThumb : ''} alt="food" />
      <h4>Cooking Instructions</h4>
      <p>{selectedMeal !== null ? selectedMeal.strInstructions : ''}</p>
    
    <div id='ingredients'>
      <h4>Ingredients < FaBowlFood/></h4>
      <ul >
        <li>{selectedMeal !== null ? selectedMeal.strMeasure1 : ''} {selectedMeal !== null ? selectedMeal.strIngredient1 : ''} </li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure2 : ''} {selectedMeal !== null ? selectedMeal.strIngredient2 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure3 : ''} {selectedMeal !== null ? selectedMeal.strIngredient3 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure4 : ''} {selectedMeal !== null ? selectedMeal.strIngredient4 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure5 : ''} {selectedMeal !== null ? selectedMeal.strIngredient5 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure6 : ''} {selectedMeal !== null ? selectedMeal.strIngredient6 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure7 : ''} {selectedMeal !== null ? selectedMeal.strIngredient7 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure8 : ''} {selectedMeal !== null ? selectedMeal.strIngredient8 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure9 : ''}{selectedMeal !== null ? selectedMeal.strIngredient9 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure10 : ''} {selectedMeal !== null ? selectedMeal.strIngredient10 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure11: ''} {selectedMeal !== null ? selectedMeal.strIngredient11 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure12 : ''} {selectedMeal !== null ? selectedMeal.strIngredient12 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure13 : ''} {selectedMeal !== null ? selectedMeal.strIngredient13 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure14 : ''} {selectedMeal !== null ? selectedMeal.strIngredient14 : ''}</li>
        <li>{selectedMeal !== null ? selectedMeal.strMeasure15 : ''} {selectedMeal !== null ? selectedMeal.strIngredient15 : ''}</li>
      </ul>
      <p>Happy cooking!</p>
    </div>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>

            
        </Container>
    )
}

export default RecipePage;