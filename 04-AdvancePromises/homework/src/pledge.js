'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if(typeof executor !== 'function'){throw new TypeError('executor must be a function') }
    this._state = "pending"
    this._handlerGroups = []

  executor(this._internalResolve.bind(this), this._internalReject.bind(this))

    }

$Promise.prototype._internalResolve = function(value){
 if (this._state === 'pending'){
 this._state = 'fulfilled'
    this._value = value // declaramos el valor de value, podia haver sido undefined tamb

}
this._callHandlers()

}


$Promise.prototype._internalReject = function(reason){
 if (this._state === 'pending'){
     this._state = 'rejected'
     this._value = reason
 }


this._callHandlers()
}

$Promise.prototype.then = function (successCb, errorCb){
 
 const downstreamPromise = new $Promise (()=>{})
    if(typeof successCb !== 'function' ) successCb = false
 if (typeof errorCb !== 'function') errorCb = false
 
 
 this._handlerGroups.push({successCb,errorCb, downstreamPromise,
 });

if( this._state !== 'pending')this._callHandlers();
return downstreamPromise;
}


//callHandlers llama a los handlers segun el estado de la promesa
$Promise.prototype._callHandlers = function (){
    while (this._handlerGroups.length){
      const current = this._handlerGroups.shift();
      var {successCb, errorCb, downstreamPromise} = current
    
    if(this._state === 'fulfilled'){
        //llamar a succescb de los obj de hanflergrup
         if( !successCb){
          downstreamPromise._internalResolve(this._value)
        }   else{

            try {
                const returnedFromHandler = successCb(this._value);
    
                if( !(returnedFromHandler instanceof $Promise)){
                    downstreamPromise._internalResolve(returnedFromHandler)
                }else {
                    returnedFromHandler.then(
                        (value)=> downstreamPromise._internalResolve(value),
                         (reason)=>downstreamPromise._internalReject(reason)
                         
                         )
                }
                
            } catch(error){
                    
                        downstreamPromise._internalReject(error)
            }
        }   
        //current.successCb &&       
    }else if ( this._state === 'rejected'){

             if (!errorCb){
               downstreamPromise._internalReject(this._value)
            }else {

                try {
                    const returnedFromHandler = errorCb(this._value)
                    if(!(returnedFromHandler instanceof $Promise)){
    
                     downstreamPromise._internalResolve(returnedFromHandler)
                    
                    } else {
                        returnedFromHandler.then(
                            (value)=> downstreamPromise._internalResolve(value),
                             (reason)=> downstreamPromise._internalReject(reason)
                             
                             )
                    } 
                    
                } catch (error) {
                    downstreamPromise._internalReject(error)
                }

                }


    }
        } 
   
        
    }
    
    $Promise.prototype.catch = function (errorHandler){
      return   this.then(null, errorHandler)
 
 
    }

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
