<?php
include "./db_conn.php";
$obj = new Connection();
$conn = $obj->connection();

$score = $_GET['score'];
$player = $_GET['player'];
$query = " INSERT INTO `players` (name, score) VALUES('$player', '$score') ";
$result = mysqli_query($conn, $query);