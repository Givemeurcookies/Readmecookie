<?php
require_once ("_config.php");
// 
class Core{
    public $dbh; // handle of the db connection
    private static $instance;

    private function __construct()
    {
        // building data source name from config
        $dsn = 'mysql:host=' . Config::read('db.host') .
               ';dbname='    . Config::read('db.basename') .
               ';port='      . Config::read('db.port') .
               ';connect_timeout=15';
        // getting DB user from config                
        $user = Config::read('db.user');
        // getting DB password from config                
        $password = Config::read('db.password');

        $this->dbh = new PDO($dsn, $user, $password);
    }

    // Lazy init, singleton pattern, might want to consider eager init instead.
    public static function getInstance()
    {
		if (!isset(self::$instance)){
            $object = __CLASS__;
            self::$instance = new $object;
        }
        return self::$instance;
    }
    public static function getClass()
    {

    }
}

// It's worth mentioning that this code use prepared statements
// Read up on this stackoverflow to see if you're safe (take note of "wrapping up" section in one of the answers):
// http://stackoverflow.com/questions/134099/are-pdo-prepared-statements-sufficient-to-prevent-sql-injection
class DB{

	// Returns an absolute value (===FALSE?TRUE)
	public function login($user, $pass, $table = null) 
	{
		// There must be a nicer way to do this (I can't include it as a default value)
		// Might be that I don't know how to handle static functions properly
		if ($table == null) $table = Config::read('db.tables.login');
		self::getClass('hash');

		$result = self::dosql("SELECT id, pass FROM UserLogin WHERE User='$user' LIMIT 1");
		if ($result['status'] === true) {
			$hashSQL = $result['result'][0]['pass'];
			return (validate_password($pass, $hashSQL));
		}
		return false;	
	}

	// Untested function, should work however not complete
	public function register($user, $pass, $table = null) 
	{
		if ($table == null) $table = Config::read('db.tables.register');

		insert(array(
			'User' => $user,
			'Pass' => create_hash($pass)
			), $table);

	}

	// This function dynamically adds entries (with the values provided)
	public function insert($array, $table = null) 
	{
		if ($table == null) $table = Config::read('db.tables.insert');

		$core = Core::getInstance();
		$core->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
		//Set date
		date_default_timezone_set('UTC');
		$array['pubDate'] = date("Y-m-d");

		// This section might be a bit confusing, have to rename the variables later
		// as they are inaccurate to what they do...
		$filteredArray = self::filterOutEmpty($array);

		$values = self::prepareValues($filteredArray);
		$keys = implode(', ', array_keys($filteredArray));

		try {
			$stmt = $core->dbh->prepare("INSERT INTO $table ($keys) VALUES ($values)")
					->execute(array_values($filteredArray));
			
			return true;
		} catch (PDOException $e) {
			// Might want to not return errorInfo later due to hackers
			if ($e->errorInfo[1] == "1062") return "Dup";
			else return $e->errorInfo[1];
		}
		return false;
	}
	// Please don't use this function if you get input from a user, it's vulnerable for SQL injections
	public function select($toselect, $table = null)
	{
		if ($table == null) $table = Config::read('db.tables.select');


	}
	public function dosql($query)
	{
		$core = Core::getInstance();
		$core->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		try {
			$stmt = $core->dbh->prepare($query);
			$stmt->execute();

			return array('status' => true, "result" => $stmt->fetchAll());
		} catch (PDOException $e) {
			return array('status' => false, "result" => $e->errorInfo[1]);
		}
	}

	// Those are just essential functions that handle arrays, not support for deeper than level 1 right now
	private function filterOutEmpty($array) 
	{
		foreach ($array as $key => $value) {
			if($value == "" || $value == null || !$value) unset($array[$key]);
		}
		return ($array);
	}

	private static function getClass($class)
	{
		$class_to_get = Config::read('classes.'.$class);
		require_once($class_to_get);
	}

	private function prepareValues($array) 
	{
		$string = "";
		foreach($array as $key => $value) {
			$string = $string."?, ";
		}
		return substr($string, 0, -2);
	}
}

?>