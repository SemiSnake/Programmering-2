<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_8</title>
  </head>
  <body>

    <?php
      $klokka = date("H");
        if ($klokka > 10) {
          echo"God morgen!";
        }elseif ($klokka >= 20) {
          echo"Ha en god dag!";
        }else  {
          echo"God kveld og god natt!";
        }
      ?>
  </body>
</html>
