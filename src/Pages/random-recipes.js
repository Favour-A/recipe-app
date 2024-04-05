import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoArrowRight } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/recipe.css';
import { Container, Row, Col } from 'react-bootstrap';
import HomePage from './home';
import '../styles/home.css';


const FoodRecipes = () => {
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [ searchQuery, setSearchQuery ] = useState('');
    
    const navigation = useNavigate();
    const HandleBackHome = () => {
        navigation('/')
       
    }

    const fetchMealsBySearch = () => {
      
        const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
  
        // Fetch data from the API
        fetch(endpoint)
            .then(response => {
                // Check if response is successful
                if (response.ok) {
                    return response.json();
                }
                // Handle errors if any
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Process the retrieved data
                setMeals(data.meals || []); // Ensure that meals array is not null
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };
  
    const handleSearchInputChange = event => {

      setSearchQuery(event.target.value);
      fetchMealsBySearch();
  };
  
  // Event handler for search button click
  const handleSearchButtonClick = () => {
      fetchMealsBySearch();
  };

  const handleSelectedMeal = (meal) => {
    setSelectedMeal(meal);
  
  }


    const viewRecipe = (category) => {
        navigation('/recipe-page/' + category);
    };

    useEffect(() => {
        const getCategory = async () => {
          const response = await axios.get('https://www.themealdb.com/api/json/v2/9973533/categories.php');
            
          setCategories(response.data.categories);
          
        };
  
        getCategory();
       
    }, []);
  

    return (
        <Container id='container'>
            <Row>

               <Col>
                    <div id='heading'>
                        
                        <button onClick={ HandleBackHome }><span> < GoArrowRight /></span> Chefs Academy</button>
                        
                    </div>
                </Col>
                <Col >
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

            {searchQuery.trim() === '' && categories.map((category, index) => (
            <Row key= {index}>
                
                <Col id='foodCategories'>
                    <div className='foodImage'>
                      <img src={category.strCategoryThumb} alt='food' />
                      <h4>{category.strCategory}</h4>
                    
                    </div>
                    <div className='foodDescription'>
                      <p>{category.strCategoryDescription }</p>
                      <button type='button' className='btn ' onClick={() => viewRecipe(category.strCategory) }> Recipes < MdKeyboardDoubleArrowRight /> </button>
                    </div>
                </Col>
                
            </Row>
            ))}
            <Row>
            <footer>
              <p>© 2024 Chefs Academy. All rights reserved.</p>
            </footer>
            </Row>
            
        </Container>

    )
}

export default FoodRecipes;