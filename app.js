const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//crear api de servidor 
const app = express();
app.use(express.json());
app.use(cors());

const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115eNlp5y";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token==null)
        return res.status(401).send("token requerido");
    jwt.verify(token, TOKEN_KEY, (err, user)=>{
        if(err) return res.status(403).send("token invalido");
        console.log(user);
         req.user = user;
         next();
        });
}

//metodo post 
app.post("/usuario/login", (req, res)=>{
    const usuario = req.body.usuario;
    const clave = req.body.clave;
    if (usuario == 'Nick' && clave =='12344'){
        const datos ={
            id:"123",
            nombre:"Nicole Cely",
            email:"nicky9025@gmail.com",
            codigo:"NBBC-1"
        }
        const token = jwt.sign(
            {userId:datos.id,email:datos.email},
            TOKEN_KEY,
            {expiresIn:"2h"}
        );
        let nDatos = {...datos, token}
        res.status(200).json(nDatos);
    }else{
        res.status(400).send("credenciales Incorrectas")
    }
});
//metodo get
app.get("/usuario/:id/ventas", verifyToken, (req, res)=>{
    const datos = [
        { id:1, cliente:"mariela", total:10000,fecha:"2022-02-15"},
        { id:2, cliente:"fernando", total:335000,fecha:"2022-02-15"},
        { id:3, cliente:"Gusman", total:485000,fecha:"2022-02-15"}
    ];
    res.json(datos);
});

//puerto correcto
app.listen(3001,()=>{
    console.log("Servidor iniciado en el puerto 3001");
});