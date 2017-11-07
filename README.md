## cempasúchil

#### Aplicación de consulta de corpus de mensajería instantánea.
****

* Para la base de datos, una vez descomprimido el archivo .zip

```sh
$ mongod
```

* En otra ventana, para crear la base de datos y guardar los documentos

```sh
$ python3 prr.py
```

* Parámetros que requieren editarse para la DB

| parámetro | prr.py |
| ------ | ------ |
| host y puerto de la bd | 8 mongoClient = MongoClient('HOST',PUERTO) |
| nombre de la base de datos | 9 db = mongoClient.NOMBRE_DB |
| nombre de la coleccion | 10 collection = db.NOMBRE_COLECCION |

****

* Descargar e instalar los módulos
```sh
$ npm install 
```

* Parámetros que requieren editarse

| parámetro | archivo | línea |
| ------ | ------ | ------ |
| host y puerto app| app.js |  17   |
| host y puerto bd | app.js |  34   |
| nombre bd | ConvProvider.js |   10     |
| coleccion bd  | ConvProvider.js |   16  |

****
