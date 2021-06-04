// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function(number) {
        return number**exp
    }
}

// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

// var swap = true

function direcciones(laberinto, direction = '') {
    
    if (typeof laberinto !== 'object') {
        return ''
    }

    var swap = false
    Object.keys(laberinto).forEach(key => {
        if(laberinto[key] === 'destino') {
            direction+=key  // SEO+E
            swap = 'win'
        }
        if(typeof laberinto[key] === 'object') {
            direction+=key
            laberinto = laberinto[key]
            swap = 'cont'
        }
    })

    if(swap === 'win') {
        return direction
    }

    if(swap === 'cont') {
        return direcciones(laberinto, direction)
    }

    return ''

        // if(laberinto) {
    //     if(laberinto.S === 'pared' && laberinto.N === 'pared' && laberinto.O === 'pared' && laberinto.E === 'pared') {
    //         return ''
    //     }
    //     else if(laberinto.S === 'destino' || laberinto.N === 'destino' || laberinto.O === 'destino' || laberinto.E === 'destino') {

    //     }
    //     else {

    //     }
    // }
    // else {
    //     return ''
    // }
    
    // if (typeof laberinto === 'object') {
    //     if(laberinto.S === 'pared' && laberinto.N === 'pared' && laberinto.O === 'pared' && laberinto.E === 'pared') {
    //         return ''
    //     }
    //     else {
    //         Object.keys(laberinto).forEach(key => {
    //             if(laberinto[key] === 'destino') {
    //                 direction+=key
    //                 return direction
    //             }
    //             else if(typeof laberinto[key] === 'object') {
    //                 laberinto = laberinto[key]
    //                 direction+=key;
    //                 return direcciones(laberinto, direction);
    //             }
    //         })
    //     }
        
    // }
    // return ''

    // pared
    // destino 
    // objeto 

    // es un objeto o me pasan algo?
}



// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    // var swap = true
    // if(arr1.length === arr2.length) {
    //     for(let i = 0; i < arr1.length; i++) {
    //         if(typeof arr1[i] === 'object') {
    //             swap = deepEqualArrays(arr1[i], arr2[i])
    //         }
    //         else {
    //             if(arr1[i] !== arr2[i]) {
    //                 swap = false
    //             }                
    //         }    
    //     }
    // }
    // else {
    //     swap = false
    // }
    // return swap

    if(JSON.stringify(arr1) === JSON.stringify(arr2)) {
        return true
    }
    return false
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function(val){
    var node = new Node(val)
    current = this.head
    if(!current) {
        this.head = node
        return 
    }
    while(val < current.value.next) {
        current = current.next
    }
    var aux = current.next

    current.next = node

    current.next.next = aux

}

// 10 --> 8 --> 6 --> 4 --> 2
//  5           C      


// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
    if(!this.head) {
        return null
    }
    else {
        var value = this.head.value

        this.head = this.head.next

        return value
    }
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function(){
    if(!this.head) {
        return null
    }
    else if (!this.head.next) {
        var value = this.head.value
        this.head = null
        return value
    }
    else {
        var current = this.head
        while(current.next.next) {
            current = current.next
        }
        var value = current.next.value
        current.next = null
        return value
    }
}
// 10 --> 8 --> 6 --> 4 --> 2
//                    C 


// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){

    // extraer valor time, y ordenar las ejecuciones segun este
    var times = []

    cbs1.forEach(element => times.push(element.time))

    cbs2.forEach(element => times.push(element.time))

    var maxTime = Math.max.apply(null, times)   //DUDA

    var result = []

    for (let i = 0; i <= maxTime; i++) {
        for (let j = 0; j < cbs1.length; j++) {
            if(cbs1[j].time === i) result.push(cbs1[j].cb())
        }
        for (let k = 0; k < cbs2.length; k++) {
            if(cbs2[k].time === i) result.push(cbs2[k].cb())
        }
    }

    return result


    // cbs1.concat(cbs2)

    // var array = cbs1.concat(cbs2)

    // array.sort(function (a, b) {
    //     return a.time - b.time;
    // })

    // array.forEach(element => element.cb())

    // return arr

    // var array = cbs1.concat(cbs2)
    // var iAux
    // while(array.length > 0) {
    //     for (let i = 0; i < array.length - 1; i++) {
    //         iAux = 0
    //         if(array[iAux].time > array[i + 1].time) {
    //             iAux = i + 1
    //         }
    //     }
    //     array[iAux].cb()
    //     array.splice(iAux, 1)
    // }
    // array[0].cb()
    // var array = []
    
    // // array.push(cbs2[0].cb())
    // // array.push(cbs1[0].cb())
    // // array.push(cbs1[1].cb())
    // // array.push(cbs2[1].cb())

    // var arrayConcat = cbs1.concat(cbs2)

    // array.push(arrayConcat[2].cb())
    // array.push(arrayConcat[0].cb())
    // array.push(arrayConcat[1].cb())
    // array.push(arrayConcat[3].cb())

    // return array
}



// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function() {
    // imprimir los valores del arbol 
    //     tiene left? si 
    //         es solo valor? pusheo el valor
    //         es un arbol? pushea valor y recurre para el lado donde tenga algo
    //     tiene right ? 
    //         es solo valor? pusheo el valor
    //         es un arbol? pushea valor y recurre para el lado donde tenga algo

    var array = []

    var depthFirst = function (node) {
        if (node) {
            array.push(node.value);
            depthFirst(node.left);
            depthFirst(node.right)
        }
    }

    depthFirst(this)

    array.sort((a, b) => {  //DUDA
        return a - b
      })
    
    return array
}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(num) {
    // rearmar logica
  if (num < 2) return false
  if (num <= 3) return true;
  
  if ((num % 2 === 0) || (num % 3 === 0)) return false;
  
  let count = 5;        //DUDA 
  
  while (Math.pow(count, 2) <= num) {
    if (num % count === 0 || num % (count + 2) === 0) return false;
    
    count += 6;
  }
  
  return true;
}


// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {
    // rearmar logica
    if(array.length < 1) {
        return [];
      };
    
      var left = [];
      var right = [];
      var pivot = array[0];
    
      for (var i = 1; i < array.length; i++) {
        if (array[i] > pivot) {
          left.push(array[i]);
        }
        else {
          right.push(array[i]);
        }
      }
    
      return [].concat(quickSort(left), pivot, quickSort(right));
}
// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num){
    var number = ''

    while(num > 0) {
        number += num%10
        num = Math.floor(num/10)
    }

    return parseInt(number)
}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}