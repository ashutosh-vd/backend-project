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
	res.render('index')
})

app.listen(3000, () => {
	console.log("Server Started")
})