<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_tabell</title>
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
   	    echo "<tr>";
   			echo "<th></th>";
   			echo "<th>Kolonne 1</th>";
   			echo "<th>Kolonne 2</th>";
   			echo "<th>Kolonne 3</th>";
   		echo "</tr>";
   		echo "<tr>";
   			echo "<th>rad 1</th>";
   			echo "<td>a</td>";
   			echo "<td>b</td>";
   			echo "<td>c</td>";
   		echo "</tr>";
   		echo "<tr>";
   			echo "<th>rad 2</th>";
   			echo "<td>d</td>";
   			echo "<td>e</td>";
   			echo "<td>f</td>";
   		echo "</tr>";
   		echo "<tr>";
   			echo "<th>osv...</th>";
   			echo "<td>?</td>";
   			echo "<td>?</td>";
   			echo "<td>?</td>";
   		echo "</tr>";
         ?>
   	</table>
  </body>
</html>
