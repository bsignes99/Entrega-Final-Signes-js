let productos = [
    {
        marca: "IPhone",
        modelo: "15 Pro Max",
        precio: 1000,
        descripcion: "64 GB, no incluye cargador.",
        id:1,
        img: "../assets/img/iphone-15-pro-max.png",
        preciofinal:
            function (){
             return ((this.precio * 20) / 100);
        }

    },
    {   marca: "Samsung",
        modelo:"S23 ultra",
        precio: 900,
        descripcion:"512 GB, 12 GB RAM, incluye cargador",
        id: 2,
        img: "../assets/img/samsung-s23-ultra.png",
        preciofinal:
            function (){
            return (this.precio * 20) / 100;
        }

    },
    {   marca: "IPhone",
        modelo: "11",
        precio: 800,
        descripcion:"64 GB, este tiene cargador si.",
        id:3,
        img: "../assets/img/apple-iphone-11.png",
        preciofinal:
            function (){
             return ((this.precio * 20) / 100);
        }
    },
    {   marca: "Samsung",
        modelo: "S20 Ultra",
        precio: 600,
        descripcion: "128 GB, 2 GB RAM",
        id:4,
        img:"../assets/img/samsung-s20-ultra.png",
        preciofinal:
            function (){
             return ((this.precio * 20) / 100);
        }
    },
    {
        marca: "Motorola",
        modelo: "c115",
        precio: 1399,
        descripcion: "Una verdadera maquina, podes jugar a la viborita",
        id: 5,
        img:"../assets/img/motorola-c115.png",
        preciofinal:
            function (){
             return ((this.precio * 20) / 100);
        }
    }
];

const subirCards = (arrayproducto) =>{
    let section = document.querySelector(".conteiner-all");
    section.innerHTML= "";

    arrayproducto.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "conteiner-prod";
        section.appendChild(contenedor);
        
        const imagen = document.createElement("div");
        imagen.innerHTML = `<img src=${producto.img} alt=""/>`
        contenedor.appendChild(imagen);
        
        const info = document.createElement("div");
        info.innerHTML = `<h2>${producto.marca} ${producto.modelo} </h2> 
        <p>Usd $${producto.precio}</p> <h5>${producto.descripcion}</h5> 
        <button onclick="agregarCarrito(${producto.id})"> Agregar al carrito </button>`
        contenedor.appendChild(info);   
        
    });
}; 

subirCards(productos);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarCarrito = (id) => {
    let objeto = productos.find((elemento) => elemento.id === id);
    let pertenece = carrito.find((elemento) => elemento.id === id);
    if(pertenece){
        pertenece.quantity++;
    }else{
        carrito.push({...objeto, quantity: 1}); 
    }

    Toastify({
        text: "Agregado correctamente.",
        style: {
            background: "linear-gradient(to right,  #A9A27C, #807749)",
          },
    }).showToast();
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

let btniphone = document.getElementById("btn-iphone");
let btnsamsung = document.getElementById("btn-samsung");
let btnmotorola = document.getElementById("btn-motorola");

const filtrariphone = () => {
    let value = btniphone.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.marca.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};
const filtrarsamsung = () => {
    let value = btnsamsung.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.marca.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};
const filtrarmoto = () => {
    let value = btnmotorola.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.marca.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};

let btntodos = document.getElementById("btn-todos");
const todos = () => {
    subirCards(productos);
};




