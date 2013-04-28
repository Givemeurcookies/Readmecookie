<?php
class Config
{
    static $confArray;

    public static function read($name)
    {
        return self::$confArray[$name];
    }

    public static function write($name, $value)
    {
        self::$confArray[$name] = $value;
    }

}

// Database connection
Config::write('db.host',     '127.0.0.1');
Config::write('db.port',     '');
Config::write('db.basename', 'rskaze_all');
Config::write('db.user',     'root');
Config::write('db.password', "idon'tneednopassword");

// Database structure
Config::write('db.tables.login',    'UserLogin');
Config::write('db.tables.register', 'UserLogin');
Config::write('db.tables.insert',   'BlogPosts');
Config::write('db.tables.select',   'BlogPosts');

// Classes and their paths (please only change the path)
Config::write('classes.hash', '_hash.php');
Config::write('classes.perm', '_permissions.php');
?>