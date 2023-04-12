const express = require("express");
const cors = require("cors");

//crear api de servidor 
const app = express();
app.use(express.json());
app.use(cors());


//metodo post 
app.post("/usuario/login",(req, res)=>{
    const usuario=req.body.usuario;
    const clave = req.body.Clave;
    if (usuario == 'nicole' && clave =='123'){
        const datos ={
            id:"123",
            nombre:"Nicole Cely",
            email:"nicky9025@gmail.com",
            codigo:"NBBC-1"
        }
        res.status(200).json(datos);
    }else{
        res.status(400).send("credenciales Incorrectas")
    }
});
//metodo get
app.get("/usuario/:id/ventas",(req, res)=>{
    const datos =[
        { id:1, cliente:"mariela", total:10000,fecha:"2022-02-15"},
        { id:2, cliente:"fernando", total:335000,fecha:"2022-02-15"},
        { id:3, cliente:"Gusman", total:485000,fecha:"2022-02-15"}
    ]
});

//puerto correcto
app.listen(3001,()=>{
    console.log("Servidor iniciado en el puerto 3001");
})