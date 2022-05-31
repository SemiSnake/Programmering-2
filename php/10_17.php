<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_17</title>
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
          for ($teller1=1; $teller1<=10; $teller1++) {
            if($teller1==1)  {
              echo"<th></th>";
            }
            echo "<th>$teller1</th>";
          }

          for ($teller2=1; $teller2<=10; $teller2++) {
            echo"<tr>";
            echo"<th> $teller2 </th>";
            for ($teller1=1; $teller1<=10; $teller1++){
              $produkt= $teller1*$teller2;

              echo"<td>$produkt</td>";
            }
            echo"</tr>";
          }
        ?>
    </table>
  </body>
</html>
