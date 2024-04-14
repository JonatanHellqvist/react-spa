Data sparas i db.json filen och körs med json-server.

Passerade datum är gömda i react calendar och även måndagar och svenska helgdagar.
Är en dag fullbokad (6 tider, 3 hot,3 cold) så göms den också.

Finns en komponent för att visa bokningar som inte används för tillfället men hade man gjort någon form av admin funktion framöver så hade denna kunnat implementerats enkelt.

Började med att dela upp varje liten del av bookingform komponenten i mindre delkomponenter men sötte då på en hel del problem med hur datan skickades och hämtades med typescript.
Så nu ligger det väldigt mycket funktioner i den komponenten vilket kanske inte är optimalt, men det fungerar i alla fall. 

Nästa steg hade varit att försöka dela upp denna på något vettigare sätt och kanske också skapa någon snyggare mapstruktur.
