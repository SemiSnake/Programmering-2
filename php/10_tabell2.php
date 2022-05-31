<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_tabell2</title>
    <style>
  th, tr	{
    border: 1px solid black;
  }

  td {
    border: 1px solid red;
    text-align: center;
  }
</style>
  </head>
  <body>
    <h2>Eksempel på statisk tabelloppsett i php som kan fylles med data!</h2>
   	<table>
        <?php
          for ($kolonne=1; $kolonne<=10; $kolonne++) {
            if($kolonne==1)  {
              echo"<th></th>";
            }
            echo "<th>kolonne</th>";
          }

          for ($rad=1; $rad<=10; $rad++) {
            echo"<tr>";
            echo"<th> rad </th>";
            for ($kolonne=1; $kolonne<=10; $kolonne++){
              echo"<td>data</td>";
            }
            echo"</tr>";
          }
        ?>
    </table>
  </body>
</html>
