const express = require('express')


const ProductosApi = require('../api/Contenedor.js')
const productosApi = new ProductosApi('./productos.txt')



const personas = [];

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Set engine
app.set('views', './views');
app.set('view engine','ejs');

//--------------------------------------------

app.get('/', (req, res) => {

    res.render('pages/index',{})
   
})

app.post('/', async(req, res) => {
    const producto = req.body;
    console.log(req.body);
    let guardar = await productosApi.save(producto);
    res.redirect('/');    
    //productos.push(req.body);
    //res.redirect('/');
})

app.get('/productos', async(req, res) => {
    let allProducts = await productosApi.getAll();
    console.log('lista?')
    console.log(allProducts)
    //res.render('pages/productos', { personas });
    res.render('pages/productos',{ allProducts });
});

//--------------------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
