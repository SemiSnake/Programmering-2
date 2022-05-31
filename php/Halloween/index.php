<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8"> <title>Halloween invitasjon</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>

      <nav id="menykonteiner">
            <button class="button button1" onclick="alert('vi finnes ikke')">Om oss</button>
            <button class=" button button1" onclick="alert('Finnes ingen støtte til halloween!')">Brukerstøtte</button>
            <button class=" button button1" onclick="alert('Kødda, det finnes ikke mer info!')">Mer info</button>
            <button class=" button button1" onclick="alert('LOL')">Bruh</button></div>
            <img src="Bilder/jack-o-lanternpng.png" alt="" class="bilde" />
      </nav>



  <div class="grid-container">
        <div class="item1"><h1> <span id="I">H</span><span id="I">A</span><span id="I">L</span><span id="I">L</span><span id="I">O</span><span id="I">W</span><span id="I">E</span><span id="I">E</span><span id="I">N</span> dag!	</h1> </div>
      <nav id="menykonteiner3">
        <a href="https://www.kul.com/uae-en/"></a><div class="item2"><p><button class="button2">Om Kirkeparken</button></div></p>
        <a href="https://www.kul.com/uae-en/"></a><div class="item2"><p><button class="button2">Om Tommy</button></div></p>
        <a href="https://www.kul.com/uae-en/"></a><div class="item2"><p><button class="button2">Om Halloween</button></div></p>

      </nav>


    <div class="item3">Hei! Vi fra Kirkeparken vgs inviterer deg med på en halloween dag fylt med<p3 style="font-family: 'Lacquer', cursive;"> Skrekk og gru!</p3>Den starter tirsdag,
        så kom for en skummel opplevelse fylt med fryd! Det er oppfordret til å gå i kostyme, men man må ikke. Det vil bli utdelt gratis godteri, og det kommer til å bli en kostyme
        konkurranse for de som vil. Meld deg på <a href="https://www.jotform.com/form-templates/category/signup-form">HER</a>
        <br>
      <div class ="item4"> <h2>Spørreskjema:</h2>

    	  <form action="" method="post">
    		Navn:<input type="text" name="navn" id="navn"/><br><br>
    		Telefon:<input type="text" name="telefon" id="telefon"/><br><br>
        Er du allergisk for noe?<input type="text" name="sporsmol1" id="sporsmol1"/><br><br>
        Hvilket kostyme skal du bruke?<input type="text" name="sporsmol2" id="sporsmol2"/><br><br>
        Mener du at den norske oversettelsen for goblins er nisser?<input type="text" name="sporsmol3" id="spormol3"/><br><br>
    		<button type="submit" name="submit">Send inn</button><br><br>
          </form>

    	  <?php
    		//Tilkoblingsinformasjon
    		$servernavn = "localhost";
    		$brukernavn = "root";
    		$passord = "";
    		$dbnavn = "deltakere";

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

    </div>
</div>

      <nav id="menykonteiner2">
            <p5>Kontakt oss: TLF: 46525493
            Epost: Tohja001@gmail.com</p5>
            <a href="https://www.facebook.com/tommy.aashjelle"><img src="Bilder/facebook.png"class="bilde2"></a>
            <a href="https://twitter.com/Roblox"><img src="Bilder/twitter.png" class="bilde2"></a>
            <a href="https://www.instagram.com/chokolabb05/"><img src="Bilder/instagram.png" class="bilde2"></a>
            <a href="https://www.youtube.com/channel/UC0PkG1l4wF3jfNHW9PGGhkw"><img src="Bilder/youtube.png" class="bilde3"></a>

      </nav>
  </body>
</html>
