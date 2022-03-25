# training-pwa
Final Project untuk Training PWA : 21-23 Maret 2022
Pembuatan manifest, service worker, fetch REST API dengan vanilla javascript dan CRUD menggunakan indexDB

# Cara instalasi project 
1. Download Via Zip -> pada tab Code 
2. atau menggunakan git clone
```bash
git clone https://github.com/metaliccode/training-pwa.git
```
# Cara Running Project PWA
- Silahkan Install Node Js terlebih dahulu, jika ingin menggunakan Local API json-server
```bash
https://nodejs.org/en/
```
- Install JSON Server secara Global
```bash
npm install -g json-server
```
- Jalankan Json Server untuk API Local 
```bash
json-server --watch db.json
```
- Jika ingin menggunakan global api
```bash
cd src/
```
buka file restAPI.js menggunakan text editor (VSCode), silahkan comment local api pada code line 12
```bash
// const url = "http://localhost:3000/posts";
```
lalu replace dengan public api my json server atau uncomment code pada line 15
```bash
const url = "https://my-json-server.typicode.com/metaliccode/api-pwa/posts";
```
- Terakhir silahkan jalankan project dengan double clik pada index.html
```bash
index.html
```
atau bisa menggunakan extensi live server pada VSCode 

# Cara Running CRUD IndexDB
- Setelah melakukan download atau clone pada project, silahkan masuk ke dir IndexDB
```bash
cd IndexDB
```
- Jalankan file index.html atau bisa juga melalui extensi live server bawaan VSCode 

# Done :)



