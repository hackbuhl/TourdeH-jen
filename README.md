# Dette er beregnings programmet til tour de højen 

## Beskrivelse af programmetæå
Dette er en webapp hosted på firebase som udregner vindere og laver fakturarer til sponsorere i forbindelse med det årlige tour det højen 

### TODO/ønskeseddel 
Præmiegivning til elcykler
 
Automatisk udsending af emails 


## Klargøring af data
Til at bruge appen uploades tre filer if semicolon sepereret utf-8 som vælges når man gemmer filerne som csv fra excel.
Det er vigtigt at sponsor data og rytternavne alitd er stavet ens 
Filerne har følgende opbygning:  

### Omgange:
1;Test Testesen;9

hvor laver man denne fil: 

### Ryttere: 
1;Test Testesen;test@gmail.com;88888888;Mand;02-07-2007;Nej

hvor laver man denne fil: 

### Sponsorere: 
Test Sponsor;Efternavn;Fornavn;Test Vej 13;7100;Vejle;testsponsor@gmail.com;12121212;Test Testesen;0;250

hvor laver man denne fil: 