<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_9</title>
  </head>
  <body>
    <form action="10_9.php" method="post">>
    Hvilket år ble du født? <input type="number" name="fodselsAar"><br>

    </form>
<?php

$aarNaa = date("Y");
$alder = $aarNaa - $_POST['fodselsAar'];
$alderForMopedLappen = 16;
$alderForBilLappen = 18;
$aarTilMopedLappen = $alderForMopedLappen - $alder;
$aarTilBilLappen = $alderForBilLappen - $alder;




if ($alder < 16){
  echo "Du må vente $aarTilMopedLappen år for å ta mopedlappen, og $aarTilBilLappen år for å ta billappen";
} elseif ($alder == 16){
  echo "Du er gammel nok for å ta mopedlappen, og du kan øvelseskjøre med bil, men du må fortsatt vente $aarTilBilLappen år for å ta billappen";
} elseif ($alder >= 18){
  echo "Du er gammel nok for moped- og billappen, fordi du er $alder år";
}
 ?>




  </body>
</html>
