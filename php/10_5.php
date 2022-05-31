<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $tall1 = 17;
      $tall2 = 9;
      $tekst1 = "Karl";
      $tekst2 = "Johan";

      $sum = $tall1 + $tall2;
      $differanse = $tall1 - $tall2;
      $produkt = $tall1 * $tall2;
      $kvotient = $tall1 / $tall2;

      $langTekst = $tekst1 . $tekst2;
      $bedreTekst = $tekst1 . " " . $tekst2 . "s gate";

      echo "Summen blir $sum <br>";
      echo "Differansen blir $differanse<br>";
      echo "Produktet blir $produkt<br>";
      echo "kvotient = $kvotient<br>";

      echo "<br><br>";
      echo "$langTekst <br>";
      echo $bedreTekst;





     ?>
  </body>
</html>
