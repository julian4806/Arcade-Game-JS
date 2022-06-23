<?php
class Connection
{
	private $sname = "localhost";
	private $unmae = "root";
	private $password = "";
	private $db_name = "meditationisland";
	public $conn;
	public function __constructor()
	{
		$this->conn = "";
	}
	public function connection()
	{
		$this->conn = mysqli_connect($this->sname, $this->unmae, $this->password, $this->db_name);
		if (!$this->conn) {
			echo "Connection failed!";
		}
		return $this->conn;
	}
}