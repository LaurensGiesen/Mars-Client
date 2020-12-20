## Client
### Informatie

Als u de repository binnengehaald hebt via git clone, dan kunt u alle files geordend zien.
In [assets](https://git.ti.howest.be/TI/2020-2021/s3/project-ii/projects/groep-14/client/-/tree/master/src/assets)
bevinden zich alle css-files, javascript-files en images. Als u
onze [index.html](https://git.ti.howest.be/TI/2020-2021/s3/project-ii/projects/groep-14/client/-/blob/master/src/index.html)
in de browser opent, kan u de volledige client-side ervaren. Hiervoor raden wij u aan een resolutie van 1920x1080 te
gebruiken. Aan de hand van requests die zich bevinden in de javascript-files, communiceert onze client met de server (
Java). De code wordt gecontroleerd via [SonarLint](https://sonar.ti.howest.be/sonar/projects?search=14+mars). Dit is een
tool die fouten/bugs zoekt in onze code. In
de [package.json](https://git.ti.howest.be/TI/2020-2021/s3/project-ii/projects/groep-14/client/-/blob/master/package.json)
zitten alle scripts die de code valideren. Zo zijn we verplicht om kwaliteitsvolle code te schrijven.
<br>

### Testaccount

We hebben geen testaccount voorzien. Het registratieproces kan echter vlot verlopen als u gebruikt maakt van het
automatisch invullen van uw gegevens.

In tegenstelling tot de mogelijkheden die vandaag de dag beschikbaar zijn, willen wij voorzien in een zo goed als
volledig geautomatiseerd proces.

Hierbij gebruiken we een combinatie van multifactor en behavioral authentication. Het invullen van paswoorden hoort dan
tot het verre verleden (bv. 2020).

### Installatie

```
git clone git@git.ti.howest.be:TI/2020-2021/s3/project-ii/projects/groep-14/client.git

```
Of

``` 
git clone https://git.ti.howest.be/TI/2020-2021/s3/project-ii/projects/groep-14/client.git
```
### Configuratie

**Path: Client/src/config.json**
```json
{
  "host": "http://localhost:8080",
  "folder": "",
  "group": "mars-14"
}

```
