# Flujo de comunicación entre usuarios, Frontend y Backend.

## Server side rendering
Usuario va al navegador -> Mediante el navegador busca una página en el servidor -> el servidor devuelve una página HTML y sus demás archivos.


## Single page application
Al ejemplo anterior, se le añade la interactividad con JavaScript para manipular el DOM, leer el HTML, actualizarlo, crear interacción con sus elementos, etc. Entre está interactividad incluye interacción con el servidor, con APIs,  estableciendo comunicación con el servidor, que asu vez se conecta con las DataBases

## Endpoints y Query Parameters
url/this/is/and/endpoint?this=is&a=query&parameter


## Status Codes

1XX -> Respuestas Afirmativas.
2XX -> Éxito.
3XX -> Re-direcciones.
4XX -> Errores en el cliente.
500 -> Errores en el servidor.

## Api Keys
Controlan la autenticación y autorización
#### Autenticación
(No) Sé quien eres
#### Autorización
(No) Tienes acceso a este recurso.

Estás API KEYS se pueden pasar por **Query Parameter o por Headers**.

Hay distintas maneras de autenticarse
Authorizathion: Basic
Authorizathion: Bearer Token
OAuth 2.0
Access Key + Secret Key
Aplication-based authentication
User-based authentitation


### Métodos HTTP

##### GET -> READ
##### POST -> CREATE
##### PUT & PATCH -> UPDATE
##### DELETE -> DELETE




### Headers HTTP


Body ➡️ Información a comunicar al Backend.
Headers ➡️ Información de como se comunicará la información al Backend.

## Headers

De autorizacion, para mandar una API_KEY ➡️ x-api-key
Content Type, habla del formato en que se realizará el envío de información, habitualmente application/json