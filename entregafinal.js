let productos = [];

let get = fetch("https://fakestoreapi.com/products")

get
.then((res)=> res.json())
.then((res) => {
    productos = res
    subirCards(productos);
})



const subirCards = (arrayproducto) =>{
    let section = document.querySelector(".conteiner-all");
    section.innerHTML= "";

    arrayproducto.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "conteiner-prod";
        section.appendChild(contenedor);
        
        const imagen = document.createElement("div");
        imagen.innerHTML = `<img src=${producto.image} alt=""/>`
        contenedor.appendChild(imagen);
        
        const info = document.createElement("div");
        info.innerHTML = ` <h5> ${producto.title} </h5>
        <section class="descripcion"> 
        <p> ${producto.description}</p> 
        </section>
        <p class="precio">Usd $${producto.price}</p>  
        <div class="btn-2">
        <a onclick="agregarCarrito(${producto.id})"> <span>Agregar al carrito </span> </a>
        </div>`
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

let btnhombre = document.getElementById("btn-hombre");
let btnmujer = document.getElementById("btn-mujer");
let btnjoyeria = document.getElementById("btn-joyeria");
let btnelectro = document.getElementById("btn-electronica");

const filtrarhombre = () => {
    let value = btnhombre.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.category.toLowerCase() === value);
    subirCards(arrayfiltrado);
};
const filtrarmujer = () => {
    let value = btnmujer.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.category.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};
const filtrarjoya = () => {
    let value = btnjoyeria.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.category.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};
const filtrarelectro = () => {
    let value = btnelectro.value.toLowerCase();
    let arrayfiltrado = productos.filter((producto) => 
    producto.category.toLowerCase().includes(value));
    subirCards(arrayfiltrado);
};
let btntodos = document.getElementById("btn-todos");
const todos = () => {
    subirCards(productos);
};




