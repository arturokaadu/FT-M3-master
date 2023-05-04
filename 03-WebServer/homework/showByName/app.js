var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req,res) =>{
    if(req.url === 'arcoiris_doge')
        fs.readFile(`${__dirname}/images/${req.url}`, (err,data)=>{
            if (err) {
                
                res.writeHead(404,{'content-type': 'text-/plain'})
                res.end('Error '
            
            )}
            else {
                res.writeHead(200,{'content-type': 'image/jpg'})
                res.end(data) }//res.end envia la informacion hacia el cliente 
        })
    
    
    


}).listen(3000, '127.0.0.1')
//se lee el archivo, se crea si hubo un error, si no, la data leida se envia al cliente a traves de res.end. 