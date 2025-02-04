import fs, { read } from "node:fs"

import express from "express";
const app = express();

import path from 'path'
import { fileURLToPath } from "url";
import { setFips } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// use of app.use() for setting of public static files
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')  						// to use ejs

app.get('/', (req, res) => {
	fs.readdir('./files', (err, files) => {
		res.render('index', {files : files});
	})
})

app.get('/profile/:username', (req, res) => {
	// res.render('index')
	const name = req.params.username
	res.send(`Kya chal Raha Hai ${name} ?`)
})

app.post('/create' , (req, res) => {
	// console.log(req.body)
	let filename = `${req.body.title.split(' ').join('_')}.txt`
	fs.writeFile(`./files/${filename}`, req.body.details, (err) => {
		if(err) {
			console.log("write Error");
		}
	})
})

app.listen(3000, () => {
	console.log("Server Started")
})