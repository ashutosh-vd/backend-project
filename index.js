import fs, { read } from "node:fs"

import express from "express";
const app = express();

import path from 'path'
import { fileURLToPath } from "url";

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
	res.redirect('/')
})

app.get('/clear', (req, res) => {
	fs.readdir(`./files`, {withFileTypes: true}, (err, files) => {
		if(err) {
			console.log("readdir Error")
		}
		files.forEach((filename) => {
			// console.log(filename)
			fs.rm(`./files/${filename.name}`, {force : true}, (err) => {
				if(err) {
					console.log("Delete Error")
				}
			})
		})
	})
	res.redirect('/');
})

app.get('/tasks/:filename', (req, res) => {
	fs.readFile(`./files/${req.params.filename}`, {encoding: 'utf8'}, (err, data) => {
		res.render('tasks.ejs', {taskdata: data, taskname: req.params.filename});
		console.log(data)
		if(err) {
			console.log(err)
		}
	})
})

app.get('/tasks/:filename/delete_task', (req, res) => {
	fs.rm(`./files/${req.params.filename}`, {force: true}, (err) => {
		if(err) {
			console.log(err);
		}
		res.redirect('/');
	})
})


app.listen(3000, () => {
	console.log("Server Started")
})