<!doctype html>
<html>
<head>
  <title>Medlemmer</title>
  <!-- UTF-8 gjør at vi kan bruke æ, ø og å -->
  <meta charset="UTF-8">
</head>
<body>
	  <p>Medlemmer</p><br>
	  <form action="" method="post">
		Fornavn:<input type="text" name="fornavn" id="fornavn"/><br><br>
		Etternavn:<input type="text" name="etternavn" id="etternavn"/><br><br>
    Telefon:<input type="text" name="telefon" id="telefon"/><br><br>
    Epost:<input type="text" name="epost" id="epost"/><br><br>
		<button type="submit" name="submit">Send inn</button><br><br>
      </form>

	  <?php
		//Tilkoblingsinformasjon
		$servernavn = "localhost";
		$brukernavn = "root";
		$passord = "";
		$dbnavn = "ansatte";

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
			$fornavn=$_POST["fornavn"];
			$etternavn=$_POST["etternavn"];
      $telefon=$_POST["telefon"];
      $epost=$_POST["epost"];

		//SQL insert-setning sendes til databasen sammen med verdiene fra tekstboksene
			$sql= sprintf("INSERT INTO ansatt (fornavn, etternavn, telefon, epost) VALUES('$fornavn','$etternavn', '$telefon', '$epost')",
			$tilkobling->real_escape_string($fornavn),
			$tilkobling->real_escape_string($etternavn),
      $tilkobling->real_escape_string($telefon),
      $tilkobling->real_escape_string($epost));

		//Sjekker om SQL-setningen ble gjennomført og om dataene er på plass i databasen
			if($tilkobling->query($sql))	{
				echo "Spørringen ble gjennomført.";
			}
			else {
				echo "Noe gikk galt med spørringen $sql($tilkobling->error).";
			}
		}
	  ?>
</body>
</html>
