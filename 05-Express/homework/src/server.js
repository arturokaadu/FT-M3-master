// const bodyParser = require("body-parser");
const express = require("express");
const STATUS_USER_ERROR = 422;
let id = 1;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
// TODO: your code to handle requests
server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    } else {
        const post = {
            id,
            author,
            title,
            contents
        }
        posts.push(post);
        id++;
        res.json(post);
    }
});
server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    } else {
        const post = {
            id,
            author,
            title,
            contents
        }
        posts.push(post);
        id++;
        res.json(post);
    }
});


server.get ('/posts', (req, res) => {
 const {term} = req.query

    if(term) 
    { 
        let posta = posts.filter(post => post.title.includes(term) || post.contents.includes(term));
    
    
        res.json(posta)
    } else{
        res.json(posts)
    }

});

server.get('/posts/:author', (req, res)=> {
    const {author} = req.params
    
        let elegidos = posts.filter (post => post.author === author )
        if(elegidos.length > 0){res.json(elegidos)}
        else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
})

server.get('/posts/:author/:title', (req, res) => {
    const {author, title} = req.params
    let elegidos = posts.filter(post => post.author === author && post.title === title);
   
   if (elegidos.length > 0) res.json(elegidos)
   else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});

 

});

server.put('/posts', (req, res)=> {
    const {id, title, contents}= req.body
    if(!id || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }
    let post = posts.find(post => post.id === id);
    if(!post){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con el id indicado"});
    } else {
        post.title = title
        post.contents = contents
        res.json(post)
    }
})


server.delete('/posts', (req, res)=> {
    const {id} = req.body
    if(!id){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningún id"})
    } 
    let post = posts.find(post => post.id === id)
    if(!post){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningún Post con ese id"})
    }
    
    else {
       posts = posts.filter(post => post.id !== id )
        res.json({ success: true })
    }
})


server.delete('/author', (req, res) =>{
    const {author} = req.body;
    if(!author){
        res.status(STATUS_USER_ERROR).json({error: "No existe ningún autor"})
    } 
    
    let postAuthor = posts.filter (post => post.author === author)
    if (postAuthor.length) {
        posts = posts.filter(post => post.author !== author)
        res.json(postAuthor)
    }
    else { res.status(STATUS_USER_ERROR).json({"error": "No existe el autor indicado"})}
})

module.exports = { posts, server };
/* server.delete( PATH, (req, res, next)=>{
    const {id} = req.body
    if(!id){ return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }
    const post = posts.find(post => post.id === id)
    if (!post){
        return res.status(STATUS_USER_ERROR).send({error: "Mensaje de Error"})
        
    }
    posts = posts.filter(post => post.id !== id)
    return res.send({ success: true})



}) */

/* server.put(PATH, (req, res) => {
let {id, title, contents} = req.body
if (id && title && contents){
           let post = posts.find(p => p.id === parseInt(id))
           // find -> devuelve el primer elemento que coincida, como el id es unico
           // deberia encontrar un elemento solo con ese id


           if(post){
               post.title = title;
               post.contents = contents;
               res.json(post);
           } else {
               res
       
               .status(STATUS_USER_ERROR)
               .json({
                 error:  "No se encuentra el ID necesario",
               })
           }


       } else {
           res
   
           .status(STATUS_USER_ERROR)
           .json({
             error:  {error: "No se recibieron los parámetros necesarios para modificar el Post"},
           })
       }


})  */



 