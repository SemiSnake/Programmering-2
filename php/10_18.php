<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Oppgave 10_18</title>
    <style>
        th	{
          border: 1px solid white;
          width: 100px;
          height: 100px;
        }

        td {
          border: 1px solid black;
          text-align: center;
          background-color: black;
          color: white;
        }
    </style>
  </head>
  <body>
    <h2>Sjakkbrett!!! Wow...</h2>
   	<table>
        <?php
          for ($bokstav=1; $bokstav<=8; $bokstav++) {
            if($bokstav==1)  {
              echo"<th></th>";
           }
            if($bokstav==1) {
              echo "<th>A</th>";
           }
            elseif ($bokstav==2) {
              echo"<th>B</th>";
           }
            elseif ($bokstav==3) {
             echo"<th>C</th>";
           }
            elseif ($bokstav==4) {
             echo"<th>D</th>";
           }
            elseif ($bokstav==5) {
             echo"<th>E</th>";
           }
            elseif ($bokstav==6) {
             echo"<th>F</th>";
           }
            elseif ($bokstav==7) {
             echo"<th>G</th>";
           }
            elseif ($bokstav==8) {
             echo"<th>H</th>";
           }
         }
          for ($tall=1; $tall<=8; $tall++) {
            echo"<tr>";
            echo"<th> $tall </th>";
            for ($bokstav=1; $bokstav<=8; $bokstav++){
              $farge = $tall % 2;

              if($bokstav==1) {

               if ($farge == 1)	{
                       echo "<td style='background-color:white; color:black;'>A".$tall."</td>";
                     }
                     else if ($farge == 0) 	{
                       echo "<td style='background-color:black; color:white;'>A".$tall."</td>";
                     }
             }
              elseif ($bokstav==2) {

               if ($farge == 0)	{
                   echo "<td style='background-color:white; color:black;'>B".$tall."</td>";
                 }
                 else if ($farge == 1) 	{
                   echo "<td style='background-color:black; color:white;'>B".$tall."</td>";
                 }

             }
              elseif ($bokstav==3) {

               if ($farge == 1)	{
                   echo "<td style='background-color:white; color:black;'>C".$tall."</td>";
                 }
                 else if ($farge == 0) 	{
                   echo "<td style='background-color:black; color:white;'>C".$tall."</td>";
                 }
             }
              elseif ($bokstav==4) {

               if ($farge == 0)	{
                   echo "<td style='background-color:white; color:black;'>D".$tall."</td>";
                 }
                 else if ($farge == 1) 	{
                   echo "<td style='background-color:black; color:white;'>D".$tall."</td>";
                 }
             }
              elseif ($bokstav==5) {

               if ($farge == 1)	{
                   echo "<td style='background-color:white; color:black;'>E".$tall."</td>";
                 }
                 else if ($farge == 0) 	{
                   echo "<td style='background-color:black; color:white;'>E".$tall."</td>";
                 }
             }
              elseif ($bokstav==6) {

               if ($farge == 0)	{
                   echo "<td style='background-color:white; color:black;'>F".$tall."</td>";
                 }
                 else if ($farge == 1) 	{
                   echo "<td style='background-color:black; color:white;'>F".$tall."</td>";
                 }
             }
              elseif ($bokstav==7) {

               if ($farge == 1)	{
                   echo "<td style='background-color:white; color:black;'>G".$tall."</td>";
                 }
                 else if ($farge == 0) 	{
                   echo "<td style='background-color:black; color:white;'>G".$tall."</td>";
                 }
             }
              elseif ($bokstav==8) {

               if ($farge == 0)	{
                   echo "<td style='background-color:white; color:black;'>H".$tall."</td>";
                 }
                 else if ($farge == 1) 	{
                   echo "<td style='background-color:black; color:white;'>H".$tall."</td>";
                 }
             }

            }
            echo"</tr>";
          }
        ?>
    </table>
  </body>
</html>
