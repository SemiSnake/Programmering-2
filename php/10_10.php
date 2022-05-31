<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $maaned = date("m");
      if ($maaned == 1){
        $m = "Januar";
      }elseif ($maaned == 2){
        $m = "februar";
      }elseif ($maaned == 3){
        $m = "Mai";
      }elseif ($maaned == 4){
        $m = "April";
      }elseif ($maaned == 5){
        $m = "Mars";
      }elseif ($maaned == 6){
        $m = "Juni";
      }elseif ($maaned == 7){
        $m = "Juli";
      }elseif ($maaned == 8){
        $m = "August";
      }elseif ($maaned == 9){
        $m = "September";
      }elseif ($maaned == 10){
        $m = "Oktober";
      }elseif ($maaned == 11){
        $m = "November";
      }elseif ($maaned == 12){
        $m = "Desember";
      }
      echo "Vi er i $m måned.";
    ?>
  </body>
</html>
