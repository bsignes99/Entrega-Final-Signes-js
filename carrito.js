let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);


const subirCards = (arrayproducto) =>{
    let carrito = document.querySelector(".conteiner-all");
    carrito.innerHTML= "";

    arrayproducto.forEach((producto) => {
        let contenedor = document.createElement("div")
        contenedor.className = "conteiner-prod";
        carrito.appendChild(contenedor);
        
        const imagen = document.createElement("div");
        imagen.innerHTML = `<img src=${producto.image} alt=""/>`
        contenedor.appendChild(imagen);
        
        const info = document.createElement("div");
        info.innerHTML = `<h2>${producto.title} </h2> 
        <p>Usd $${producto.price}</p>
        <section class="btn-contador">
        <a class="btn btn-2" onclick="restar(${producto.id})"> - </a>
        <p class="cantidad">${producto.quantity}</p> 
        <a class="btn btn-2" onclick="sumar(${producto.id})"> + </a>
        </section>
        <a class="btn btn-2" onclick="eliminar(${producto.id})"> Elminar </a>`;
        contenedor.appendChild(info);   
        
    });
}; 

const totalcompra= (carrito) => {
    precioTotal= 0;
    for (let i = 0; i < carrito.length; i++) {
        precioTotal += carrito[i].quantity * carrito[i].price;         
    };
    return precioTotal;
};

const mostrarProd = (carrito) =>{
    resumenTotal="";
    for (let i = 0; i < carrito.length; i++) {
        resumenTotal += " "+ carrito[i].title + " " + " x"+ carrito[i].quantity + "......................";         
    };
    return resumenTotal;
};
const actualizar = () => {
let resumen = document.getElementById("resumen");
resumen.innerHTML = "<p>El total de su compra es: $"+ 
totalcompra(carrito) +"<br></br>"+ 
mostrarProd(carrito) 
+"</p>";
};

actualizar();



subirCards(carrito);

const eliminar = (id) => {
    carritofiltrado = carrito.filter((elemento) => elemento.id != id);
    carrito = carritofiltrado;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    subirCards(carrito);
    Toastify({
        text: "Producto eliminado.",
        style: {
            background: "linear-gradient(to right,  #A9A27C, #807749)",
          },
    }).showToast();

};

const sumar = (id) => {
    let productoSumar = carrito.find((elemento) => elemento.id === id);
    productoSumar.quantity += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizar();
    subirCards(carrito);
};

const restar = (id) => {
    let productoSumar = carrito.find((elemento) => elemento.id === id);
    if(productoSumar.quantity === 1){
        eliminar(id);
        Toastify({
            text: "Producto eliminado.",
            style: {
                background: "linear-gradient(to right,  #A9A27C, #807749)",
              },
        }).showToast();
    }else{
        productoSumar.quantity -= 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizar();
    subirCards(carrito);
};