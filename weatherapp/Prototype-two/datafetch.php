
<?php
$api_key = "4af7685c70353dad458d441af6fa6dc7";
$api_url = `https://api.openweathermap.org/data/2.5/weather?q=kathmandu&units=metric&APPID={$api_key}`;

// Read JSON file
$json_data = file_get_contents($api_url);

// Decode JSON data into an associative array
$response_data = json_decode($json_data,true);

//Extracting
$temp = $data['list'][0]['main']['temp'];
$pressure = $data['list'][0]['main']['pressure'];



?>