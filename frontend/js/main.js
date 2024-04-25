window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  
  const div = document.createElement('div');
  div.style.width = "100%"
  div.style.display ="flex"
  div.style.justifyContent ="space-around"
  const botonCreate = document.createElement("button");
  botonCreate.textContent = "Add Movie"
  botonCreate.onclick=()=>{
    window.location.href = "http://127.0.0.1:5500/frontend/formulario.html"
  }
  botonCreate.style.borderRadius ="8px"
  botonCreate.style.boxShadow ="5px 5px 5px #0005"
  botonCreate.style.background ="none"
  botonCreate.style.border ="1px solid #0005"
  botonCreate.style.padding = "10px"

  const botonFav = document.createElement("button");
 botonFav.textContent = "Favourite Movie"
 botonFav.onclick=()=>{
    window.location.href = "http://127.0.0.1:5500/frontend/favoritas.html"
  }
 botonFav.style.borderRadius ="8px"
 botonFav.style.boxShadow ="5px 5px 5px #0005"
 botonFav.style.background ="none"
 botonFav.style.border ="1px solid #0005"
 botonFav.style.padding = "10px"

  container.appendChild(div)
  div.appendChild(botonCreate);
  div.appendChild(botonFav);

  app.appendChild(container);

  const local = localStorage.getItem("arrayID")
  const newLocal = JSON.parse(local)
  console.log("local..",newLocal);
  // Aqui debemos agregar nuestro fetch
  fetch('http://localhost:3031/api/movies')
  .then((response)=>response.json())
  .then((peliculas)=>{

    
  /** Codigo que debemos usar para mostrar los datos en el frontend*/
    let data = peliculas.data;
    let arrayID;
    if(newLocal == null){
       arrayID = []
    }else{
       arrayID = newLocal
    }

    data.forEach((movie) => {
      
      
 
      const id = movie.id
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      
      const icon = document.createElement("i")
      icon.classList.add("fa-regular", "fa-star"); 

      if(!local){
      icon.classList.add("fa-regular", "fa-star"); 
      }else if(local.includes(id)){
      icon.classList.add("fa-solid", "fa-star"); 
          
      }

      card.appendChild(icon)
      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const botonEdit = document.createElement("button");
      botonEdit.textContent = "Edit Movie";

        botonEdit.onclick=()=>{
          window.location.href = `http://127.0.0.1:5500/frontend/formulario.html?id=${id}`; 
        };
        botonEdit.style.borderRadius ="8px"
        botonEdit.style.boxShadow ="5px 5px 5px #0005"
        botonEdit.style.background ="none"
        botonEdit.style.border ="1px solid #0005"
        botonEdit.style.padding = "10px"
        botonEdit.style.marginLeft = "0px"

        icon.onclick = () => {
        if (icon.classList.contains("fa-regular") /*|| newLocal==null*/) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          arrayID.push(id)
          localStorage.setItem("arrayID",JSON.stringify(arrayID));  
         } else {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          const index = arrayID.indexOf(movie.id);
          if (index !== -1) {
              arrayID.splice(index, 1);
              newLocal.splice(id)
              localStorage.setItem("arrayID",JSON.stringify(arrayID)); 
          }
        }
        // if (icon.classList.contains("fa-regular") && newLocal) {
        //   icon.classList.remove("fa-regular");
        //   icon.classList.add("fa-solid");
        //   arrayID.push(id)
        //   localStorage.setItem("arrayID",JSON.stringify(arrayID));  
        //  }
        
        

        // if(icon.classList.contains("fa-solid")){
        //   arrayID.splice(id)
        // } 
  };
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      

      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(botonEdit)
    });
  })

};
