<?php
session_start();
setcookie("account_created", "false", time() + (30), "/");
setcookie("username_in_use", "false", time() + (30), "/");
setcookie("empty_fields", "false", time() + (30), "/");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Register Check</title>
    </head>
    <body>

<?php

require_once '../../login.php';

$connection = new mysqli($hn, $un, $pw, $db);

if ($connection->connect_error) die($connection->connect_error);


if ($_SERVER["REQUEST_METHOD"] == "POST")
{
   if (isset($_POST['firstname']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['security1']) && isset($_POST['security2']))
   {
      $fn_temp = mysql_entities_fix_string($connection, $_POST['firstname']);
      $sn_temp = mysql_entities_fix_string($connection, $_POST['surname']);
      $un_temp = mysql_entities_fix_string($connection, $_POST['username']);
      $pw_temp = mysql_entities_fix_string($connection, $_POST['password']);
      $sq1_temp = mysql_entities_fix_string($connection, $_POST['security1']);
      $sq2_temp = mysql_entities_fix_string($connection, $_POST['security2']);

      if !(($_POST['firstname'] != '') &&
      ($_POST['surname'] != '') &&
      ($_POST['username'] != '') &&
      ($_POST['password'] != '') &&
      ($_POST['security1'] != '') &&
      ($_POST['security2'] != ''))
      {
        setcookie("empty_fields", "true", time() + (30), "/");
        die();
      }

      $query = "SELECT username FROM users";
      $result = $connection->query($query);
      if (!$result) die($connection->error);
      else
      {
         foreach($result as $row)
         {
            if ($row['username'] == $un_temp) die("Username already in use.");
            setcookie("username_in_use", "true", time() + (30), "/");
         }
      }

      $token = hash($algo, "$salt1$pw_temp$salt2");

      $query = "INSERT INTO users VALUES('$fn_temp', '$sn_temp', '$un_temp', '$token', '$sq1_temp', '$sq2_temp', 1, '', 'False')";
      $result = $connection->query($query);
      if (!$result) die($connection->error);
      else
      {
         setcookie("account_created", "true", time() + (30), "/");
      }
   }
}

function mysql_entities_fix_string($connection, $string)
{
   return htmlentities(mysql_fix_string($connection, $string));
}

function mysql_fix_string($connection, $string)
{
   if (get_magic_quotes_gpc()) $string = stripslashes($string);
   return $connection->real_escape_string($string);
}


?>
</body>
</html>
