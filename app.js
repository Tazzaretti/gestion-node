require("dotenv").config();
const express = require("express");
const app = express();
const cons = require("consolidate");
let swig = require("swig");
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis").default;
const redisClient = redis.createClient();
const compression = require("compression");
const port = process.env.PORT || 3000;
const db = require("./database");
const menues = require("./menu");


// Comprime las solicitudes HTTP para reducir la carga y el tamaño
app.use(compression());

//Esta opción determina cómo se manejan los datos codificados en URL.
//Cuando está configurado en true, utiliza la librería qs para analizar los datos, 
//lo que permite manejar objetos anidados y arreglos complejos. Es más potente y flexible.
app.use(express.urlencoded({ extended: true }));

//Este middleware se utiliza para analizar cuerpos de solicitudes HTTP que vienen en formato JSON
app.use(express.json());


app.use(
    session({
        name: "sessionCookie",
        secret: process.env.SECRETKEY,
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
    })
);

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// configura swig como motor de plantillas
app.engine("html", cons.swig);
// configura que los html seran procesados por swig
app.set("view engine", "html");
// da la ruta de las vistas con la base mas modules
app.set("views", __dirname+ "/modules");
//configura la aplicacion para servir archivos estaticos
app.use(express.static(__dirname + "/public"));

// middleware personalizado que verifica si hay un usuario en la
// sesion y en ese caso lo asigna a res.locals.user para que la informacion
// del usuario este disponible en todas las vistas renderizadas
app.use(async function(req, res, next){
    if (req.session.user != null) {
        res.locals.user = req.session.user;
    }
    
    // obtengo los menues 
    res.locals.menu = await menues.getMenuHTML();

    next();
});

// RUTAS
app.use(require("./modules/index/routes"));
app.use(require("./modules/clientes/routes"));
app.use(require("./modules/localidades/routes"));
app.use(require("./modules/iva/routes"));
app.use(require("./modules/articulos/routes"));

// Conecciones a redis y bd
(async function () {
    try {
        await redisClient.connect();
        console.log("Redis iniciado");
        await db.initConnectionMYSQL();
        console.log("Conexion a MYSQL establecida");

        app.listen(port, async (error) => {
            if (error) throw error;
            console.log(`Escuchando en el puerto ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit();
    }
})();