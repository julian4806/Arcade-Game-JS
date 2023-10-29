<?php
include "./db_conn.php";
$obj = new Connection();
$conn = $obj->connection();

$player = $_GET['player'];
$score = $_GET['score'];

$my_date = date("Y-m-d H:i:s");

$query = "INSERT INTO `player` (name, date) VALUES(?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $player, $my_date);
$stmt->execute();

$player_id = $stmt->insert_id;

$query = "INSERT INTO `score` (player_id, score, playdate) VALUES(?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iis", $player_id, $score, $my_date);
$stmt->execute();
