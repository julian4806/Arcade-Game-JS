<?php
include "./db_conn.php";
$obj = new Connection();
$conn = $obj->connection();

$player = $_GET['player'];
$score = $_GET['score'];

$my_date = date("Y-m-d H:i:s");
$query = " INSERT INTO `player` (name , date) VALUES('$player', '$my_date') ";
$result = mysqli_query($conn, $query);

$player_id = $conn->insert_id;
$query = " INSERT INTO `score` (player_id, score, playdate) VALUES('$player_id', '$score', '$my_date') ";
$result = mysqli_query($conn, $query);