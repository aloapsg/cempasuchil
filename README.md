## cempasúchil

#### Aplicación de consulta de corpus de mensajería instantánea.
****

* Para la base de datos, una vez descargado y descomprimido el archivo de conversaciones:
 [archivo conversaciones](https://drive.google.com/file/d/1laFzcHpnEpKJkZH6uMQMF4niaaUikzGC/view?usp=sharing)

```sh
$ mongod
```

* En otra ventana, para crear la base de datos y guardar los documentos

```sh
$ python3 prr.py
```

* Parámetros que requieren editarse para la DB

| parámetro | progx.py |
| ------ | ------ |
| host y puerto de la bd | 9 mongoClient = MongoClient('HOST',PUERTO) |
| nombre de la base de datos | 10 db = mongoClient.NOMBRE_DB |
| nombre de la coleccion | 11 collection = db.NOMBRE_COLECCION |

****

* Descargar e instalar los módulos
```sh
$ npm install 
```

* Parámetros que requieren editarse

| parámetro | archivo | línea |
| ------ | ------ | ------ |
| host y puerto app| app.js |  16   |
| host y puerto bd | app.js |  33   |
| nombre bd | ConvProvider.js |   10     |
| coleccion bd  | ConvProvider.js |   16  |

****

* Inic
```sh
$ node app 
```

