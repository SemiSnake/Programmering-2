<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8"> <title>Halloween invitasjon</title>
    <style>





  </style>
  </head>
  <body>
    <div>

    	  <?php
    		//Tilkoblingsinformasjon
    		$servernavn = "localhost";
    		$brukernavn = "root";
    		$passord = "";
    		$dbnavn = "jazzfestival";

    		//Oppretter en kobling
    		$tilkobling = mysqli_connect($servernavn, $brukernavn, $passord, $dbnavn);

    		// Sjekker koblingen fungerer
    			if ($tilkobling->connect_error) {
    			die("Noe gikk galt: " . $tilkobling->connect_error);
        }
    		//Angi UTF-8 som tegnsett og æ, ø og å vises r
    		$tilkobling->set_charset("utf8");

    		//Sjekker om send-knappen i html-skjemaet er aktivert (trykket ned)
    		if (isset ($_POST["submit"]))
    		{
    		//Lagrer inndata fra skjemafeltene i variabler med enklere navn som benyttes nedenfor
    			$navn=$_POST["navn"];
          $telefon=$_POST["telefon"];
          $sporsmol1=$_POST["sporsmol1"];
          $sporsmol2=$_POST["sporsmol2"];
          $sporsmol3=$_POST["sporsmol3"];


    		//SQL insert-setning sendes til databasen sammen med verdiene fra tekstboksene
    			$sql= sprintf("INSERT INTO deltaker (navn, telefon, sporsmol1, sporsmol2, sporsmol3) VALUES('$navn', '$telefon', '$sporsmol1', '$sporsmol2', '$sporsmol3')",
    			$tilkobling->real_escape_string($navn),
          $tilkobling->real_escape_string($telefon),
          $tilkobling->real_escape_string($sporsmol1),
          $tilkobling->real_escape_string($sporsmol2),
          $tilkobling->real_escape_string($sporsmol3));

    		//Sjekker om SQL-setningen ble gjennomført og om dataene er på plass i databasen
    			if($tilkobling->query($sql))	{
    				echo "Nice! Din innmelding har blitt registrert";
    			}
    			else {
    				echo "Noe gikk galt med spørringen $sql($tilkobling->error).";
    			}
    		}
    	  ?>

      </div>
  </body>
</html>
