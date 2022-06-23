<?php

include "./db_conn.php";
$obj = new Connection();
$conn = $obj->connection();

$query = " SELECT player.name AS player, score.score AS score FROM player INNER JOIN score ON player.id = score.player_id ORDER BY score DESC LIMIT 5 ";
$result = mysqli_query($conn, $query);

// $row_count = mysqli_num_rows($result);
// $row_users = mysqli_fetch_array($result);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <title>Meditation Island</title>
    <script src='assets/data/collisions.js' defer></script>
    <script src='assets/data/fruits.js' defer></script>
    <script src='assets/js/classes.js'></script>
    <script src='assets/js/script.js' defer></script>
    <link rel='stylesheet' href='assets/css/style.css'>
</head>

<body style="opacity: 0;">

    <div>
        <div class="initialMessage">
            <h1>Meditation Island</h1>
            No competition here! <br>
            Just get <span>20</span> points to complete the game! <br>
            Enjoy and B-Calm ✌️!
        </div>
        <div class="winMessage" style="display: none;">
            <h1>Meditation Island</h1>
            You finished the game!<br>
            Your name will now appear on the scoreboard <br>
            Well done!
        </div>
        <div class="video">

        </div>
        <div class="gameScreen">
            <div class="scoreboard">
                <p>scoreboard</p>
                <ul>
                    <?php
                    while ($row_users = mysqli_fetch_array($result)) {
                        echo "<li>" . ($row_users['player']) . ": " . ($row_users['score']) . "</li>";
                    }
                    ?>
                </ul>
                <div>
                    Your name: <span class="name"></span><br>
                    Your score: <span class="yourScore"></span>
                </div>
            </div>
            <canvas></canvas>
        </div>
        <div class='note' style='display: none;'></div>
        <img src='assets/img/talahRama.gif' class='talahRama' style='display: none;' alt=''>
    </div>
</body>

</html>

<!-- 

https://youtu.be/yP5DKzriqXA
3:04:54

To-Do:
Resize players
    
 -->