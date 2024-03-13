<?php

// Endpoint to fetch data from The MealDB API
$url = 'https://www.themealdb.com/api/json/v2/9973533/randomselection.php';

// Initialize cURL session
$curl = curl_init();

// Set cURL options
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

// Execute cURL session
$response = curl_exec($curl);

// Close cURL session
curl_close($curl);

// Output the response
echo $response;
?>
