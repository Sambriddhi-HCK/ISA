<?php
// Include the database connection file
include_once 'connection.php';

// Check if the 'city' parameter was passed via GET
if (isset($_GET['name'])){
    $city = $_GET['name'];
}

// Get the current date
$today = date('Y-m-d', time());

// Define the function to retrieve and store the weather data
function data_table($city, $today, $con){
    // Check if the weather data for the given city and date is already in the database
    $query = "SELECT * FROM `current_data` WHERE city = '$city' and date_stamp = '$today'";
    $sql = mysqli_query($con, $query);
    $rows = mysqli_num_rows($sql);

    if ($rows == 0){
        // If the data is not in the database, retrieve it from the API

        $apikey ="4af7685c70353dad458d441af6fa6dc7";
        $api_url = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&APPID=$apikey";
        $response_json = file_get_contents($api_url);
        $response_data = json_decode($response_json);

        
        // Extract the necessary data from the API response
        $city = $response_data->name;
        $description = $response_data->weather[0]->description;
        $icon = $response_data->weather[0]->icon;
        $max_temperature = $response_data->main->temp_min;
        $min_temperature = $response_data->main->temp_max;
        $pressure = $response_data->main->pressure;
        $humidity = $response_data->main->humidity;
        $wind_speed = $response_data->wind->speed;
        $wind_degree = $response_data->wind->deg;

        //Query to insert data into current_data table 
        $query = "INSERT into `current_data`(`city`, `description`, `icon`, `max_temperature`, `min_temperature`, `pressure`, `humidity`, `wind_speed`, `wind_degree`, `date_stamp`) VALUES ('$city', '$description', '$icon', $max_temperature, $min_temperature, $pressure, $humidity, $wind_speed, $wind_degree, '$today')";
        
        mysqli_query($con, $query); 

        $query2 = "SELECT * FROM `current_data` WHERE city = '$city' and date_stamp = '$today'";
        $sql2 = mysqli_query($con, $query2);
        $data = mysqli_fetch_assoc($sql2);

        return json_encode($data);

    } else {

        // If the data is already in the database, run query to select all data from the table
        $data = mysqli_fetch_assoc($sql);
        return json_encode($data);
    }
}

// Call the function and output the results
echo data_table($city, $today, $con);
?>