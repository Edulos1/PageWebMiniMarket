// CARRITO GLOBAL
function agregarCarrito(nombre, precio){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({nombre, precio});
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// CONTADOR
function actualizarContador(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contador = document.getElementById("contador");
    if(contador) contador.innerText = carrito.length;
}
actualizarContador();

// MOSTRAR PRODUCTOS POR CATEGORÍA
const params = new URLSearchParams(window.location.search);
const cat = params.get("cat");

if(cat && document.getElementById("listaProductos")){
    document.getElementById("tituloCategoria").innerText = cat;

    let filtrados = productos.filter(p => p.categoria === cat);

    filtrados.forEach(p=>{
        document.getElementById("listaProductos").innerHTML += `
        <div class="card">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="agregarCarrito('${p.nombre}',${p.precio})">
                Agregar
            </button>
        </div>`;
    });
}

//Mostrar ofertas
function mostrarOfertas(){
    const contenedor = document.getElementById("listaOfertas");
    if(!contenedor) return;

    contenedor.innerHTML = "";

    const ofertas = productos.filter(p => p.descuento);

    ofertas.forEach(p => {
        let precioFinal = p.precio - (p.precio * p.descuento / 100);

        contenedor.innerHTML += `
        <div class="card">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>
                <del>$${p.precio}</del> 
                <strong>$${precioFinal}</strong>
            </p>
            <p>${p.descuento}% OFF</p>
            <button onclick="agregarCarrito('${p.nombre}', ${precioFinal})">
                Agregar
            </button>
        </div>
        `;
    });
}


// PAGO
function pagar(e){
    e.preventDefault();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    alert("Pago realizado correctamente 🎉");

    localStorage.removeItem("carrito");

    window.location.href = "index.html";
}


/*Adicionales para el carrito de compras*/

// MOSTRAR CARRITO EN CHECKOUT
function mostrarCarrito(){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("resumen-carrito");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    if(carrito.length === 0){
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        contenedor.innerHTML += `
        <div class="item-carrito">
            <span>${item.nombre}</span>
            <span>$${item.precio}</span>
            <button onclick="eliminarProducto(${index})">X</button>
        </div>`;
    });

    contenedor.innerHTML += `<div class="total">Total: $${total}</div>`;
}

/*Eliminar producto*/
function eliminarProducto(index){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
    actualizarContador();
}
/* Vaciar carrito */
function vaciarCarrito(){
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContador();
}
/* Cancelar compra */
function cancelarCompra(){
    if(confirm("¿Deseas cancelar la compra?")){
        window.location.href = "index.html";
    }
}
mostrarOfertas();
mostrarCarrito();