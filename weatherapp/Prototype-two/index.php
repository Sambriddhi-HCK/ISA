<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEATHER APP</title>
</head>
<body>
    
    <header>
        <div class="top-nav">
            <div class="nav-items">
                <div class="left-nav-item">
                    <div class="logo">
                        SSWeather 🌏
                    </div>
                </div>

                <div class="right-nav-item">
                    <form class="search-box">
                        <input type="text" placeholder="Search Location" id="city-search-box">
                        <i class="fa fa-search" aria-hidden="true" id="submit" type="submit"></i>
                        <input style="display:none;" id="submit" type="submit">
                    </form>
                </div>

            </div>

        </div>
    </header>
    <main>
        <div id="container">
            <!-- adding data -->
            <p id="datebox"></p> 
            

            <div id="container-Weatherinfo">
                <h1>Weather Forecast</h1>

                <h2 class="city_name">Arlington</h2>

                <h3 class = "weather_description"></h3>

                <h4 class = "weather-icon"></h4>

                <h3 class="maximum-temperature"> </h3>

                <h3 class="minimum-temperature"></h3>

                <h3 class="humidity"> </h3>
                <h3 class="windspeed"></h3>
                <h3 class="pressure"></h3>

                <h3 id="error-message"></h3>
            </div>
        </div>
   
    
    <?php
    include 'connection.php';

    if (isset($_POST['save_btn'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $age = $_POST['age'];
        $address = $_POST['address'];

        $query = "Insert into DETAILS (name,email,age,address) VALUES ('$name', $email, '$age', '$address')";

        $sql = mysqli_query($con, $query);
        if ($sql){
            ?>
            <script> alert ("Data Inserted Successfully")</script>
            <?php
        }else{
            ?>
            <script> alert ("ERORR INSERTING DATA")</script>
            <?php
            }
    }
    ?>

</main>

<footer>
    <div id="footer">
        &copy;SSWeather 🌏@2023
    </div>
</footer>
<!------ footer with copyright ------->
</body>
</html>