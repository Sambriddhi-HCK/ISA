<?php
    // Include the database connection file
    include_once 'connection.php';

    if (isset($_GET['name'])){ //Check if name variable was passed using GET method
        $city = $_GET['name']; // Store city name in city variable using GET method
    }


    function data_table($city,$time_stamp,$con){

        $apikey ="4af7685c70353dad458d441af6fa6dc7";
        $api_url = "https://history.openweathermap.org/data/2.5/history/city?q=$city&type=hour&start=$time_stamp&cnt=1&units=metric&appid=$apikey"; //api for history data

        // Read JSON file
        $response_json = file_get_contents($api_url); 

        // Decode JSON data into an associative array
        $response_data = json_decode($response_json,true);

        if ($response_data) {
            // If response is positive, extract the necessary data from the API response

            $date = date('Y-m-d', $time_stamp);
            $description = $response_data['list'][0]['weather'][0]['description'];
            $icon = $response_data['list'][0]['weather'][0]['icon'];
            $max_temperature = $response_data['list'][0]['main']['temp_max'];
            $min_temperature = $response_data['list'][0]['main']['temp_min'];
            $pressure = $response_data['list'][0]['main']['pressure'];
            $humidity = $response_data['list'][0]['main']['humidity'];
            $wind_speed = $response_data['list'][0]['wind']['speed'];
            $wind_degree = $response_data['list'][0]['wind']['deg'];

            // echo $city,'/',$description,'/',$icon,'/', $max_temperature,'/', $min_temperature,'/', $pressure,'/', $humidity,'/', $wind_speed,'/', $wind_degree,'/',$date;

            $insert_query = "INSERT into `past_data`(`city`, `description`, `icon`, `max_temperature`, `min_temperature`, `pressure`, `humidity`, `wind_speed`, `wind_degree`, `date_stamp`) VALUES ('$city', '$description', '$icon', $max_temperature, $min_temperature, $pressure, $humidity, $wind_speed, $wind_degree, '$date')"; //query to insert data into past_data table 

            // echo $insert_query;
            
            mysqli_query($con, $insert_query);
        }
    }

    function get_past_data($name,$con){
        $past_date = date('Y-m-d',strtotime("8 days ago")); //SELECT date of 8 days ago 
        $past_query = "SELECT * FROM `past_data` WHERE city = '$name' and date_stamp > '$past_date' "; // SELECT data that are earlier than 8 days i.e., for past 7 days

        $response = mysqli_query($con, $past_query);
        $num_of_row = mysqli_num_rows($response);

        if ($num_of_row < 7){ // If there is no updated data for past 7 days
            $count = 7;
            while ($count > 0){

                $past_date2 = date('Y-m-d',strtotime("$count days ago"));
                $past_query2 = "SELECT * FROM `past_data` WHERE city = '$name' and date_stamp = '$past_date2' "; //SELECT data for $count days ago
                $response2 = mysqli_query($con, $past_query2);
                $num_of_row2 = mysqli_num_rows($response2);

                if ($num_of_row2 == 0){ //If there's no data for that day
                    $time_stamp = strtotime("$count day ago");
                    data_table($name,$time_stamp,$con); // Call data table to retrieve data for that day
                }
                $count--;
            }
            $query = "SELECT * FROM `past_data` WHERE city = '$name' and date_stamp > '$past_date' "; // IF there's updated data, SELECT the data from database
            $sql = mysqli_query($con,$query);

            $all_data = array();
            if ($sql){
                while($data = mysqli_fetch_assoc($sql)){
                    array_push($all_data,$data);
                }
            } 
            return json_encode($all_data);


        }else{
            $query = "SELECT * FROM `past_data` WHERE city = '$name' and date_stamp > '$past_date' "; // IF there's updated data, SELECT the data from database
            $sql = mysqli_query($con,$query);

            $all_data = array();
            if ($sql){
                while($data = mysqli_fetch_assoc($sql)){
                    array_push($all_data,$data);
                }
            } 
            return json_encode($all_data);
        }
    }
    // Call the function and output the results
    echo get_past_data($city,$con);
    
?>