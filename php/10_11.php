<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_11</title>
  </head>
  <body>
    <?php
      $terningKast = rand(1,6);

      echo"Denne nettsiden fungerer som ett magic 8 ball program. Trykk på f5 for å få en ny spådom <br> <br>";

      if ($terningKast == 1){
        echo"Kanskje det";
      }elseif ($terningKast == 2){
        echo"Ja";
      }elseif ($terningKast == 3){
        echo"Ikke sjans";
      }elseif ($terningKast == 4){
        echo"Mest sannsynlig";
      }elseif ($terningKast == 5){
        echo"Har ikke peiling";
      }elseif ($terningKast == 6){
        echo"Kun hvis du vil det nok";
      }






    ?>

  </body>
</html>
