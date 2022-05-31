<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_15</title>
  </head>
  <body>
<?php
$kort = rand(1,13);
$teller = 0;
while($kort !=1){
  $teller++;
  echo"<p>Du fikk $kort, uffa meg...</p>";
  $kort = rand(1,13);
}

echo"<p> Du klarte å få ess! Gratulerer! Selv om du brukte $teller forsøk da...";
?>
  </body>
</html>
