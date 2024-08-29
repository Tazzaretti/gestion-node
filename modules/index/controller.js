const mUsuarios = require("../usuarios/model");
const bcrypt = require('bcryptjs');

exports.getInicio = async (req, res) => {
    res.render('index/views/inicio', {
        pagename: "Inicio"
        }
    )
}

exports.getLogin = async (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    // Obtengo las credenciales para el inicio de sesion
    const { username, password } = req.body;

    // Validacion de campos
    if (!username.length || !password.length) return res.json({ type: "error", title: "Error", text: "Complete los campos" });

    // Si el usuario es developer
    if (username == process.env.DEV_USER && password == process.env.DEV_PASSWORD) {
        req.session.user = {
            id:0,
            nombre: process.env.DEV_USER,
            grupo: 0,
            mail: '',
            usuario: {},
            developer: true,
            nivel: 'Developer',
        }

        req.session.auth = true;
        req.session.save();
        return res.json({type: "success"});
    } // Aca termina si es dev


    //Si no es dev obtengo el usuario por su username
    const usuario = await mUsuarios.getByName(username);

    // Si no existe
    if (!usuario.length) return res.json({ type: "error", title: "Error", text: "Usuario o clave incorrectos" });

    // Llamo a la funcion comparePassword que comparara la contrasenia encriptada con la ingresada realizando
    // un encrypt con hash
    const result = await comparePassword(password.toLowerCase(), usuario[0].clave);
    if (!result) return res.json({type: "error", title: "Error", text: "Usuario o clave incorrectos"});


    // Si la propiedad activa del usuario es 0 significa que es un usuario inactivo
    if(usuario[0].activa == 0) return res.json({ type: "error", title:"Error", text:"Usuario no activo"});

    //Si se pasan todas las validaciones guardo los datos en la session
    req.session.user = {
        id: usuario[0].unica,
        nombre: usuario[0].usuario,
        grupo: 0,
        mail: usuario[0].mail,
        usuario: usuario[0],
        nivel: usuario[0].niveles
    }

    req.session.auth = true;
    req.session.save();

    return res.json({ type: "success" })
}


exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log(err)
        }
    })
}



function comparePassword(candidatePassword, hash) {
    return new Promise((resolve, r3eject) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) reject(err);
            resolve(isMatch);
        });
    });
}