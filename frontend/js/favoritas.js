window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const div = document.createElement('div');
  div.style.width = "100%"
  div.style.display ="flex"
  div.style.justifyContent ="space-around"
  const botonHome = document.createElement("button");
  botonHome.textContent = "Home"
  botonHome.onclick=()=>{
    window.location.href = "http://127.0.0.1:5500/frontend/home.html"
  }
  botonHome.style.borderRadius ="8px"
  botonHome.style.boxShadow ="5px 5px 5px #0005"
  botonHome.style.background ="none"
  botonHome.style.border ="1px solid #0005"
  botonHome.style.padding = "10px"
  container.appendChild(div)
  div.appendChild(botonHome);

  app.appendChild(container);

const arrayId = localStorage.getItem("arrayID")
console.log("arrayyy",arrayId);
const arrayNum = JSON.parse(arrayId)
localStorage.setItem("arrayId", arrayNum)
arrayNum.forEach((movieId)=>{
// console.log(dataId.dataType)    

  fetch(`http://localhost:3031/api/movies/${movieId}`)
  .then((response)=>response.json())
  .then((peliculas)=>{

   let data = peliculas.data;
console.log("data",data)
    // data.forEach((data) => {
      
      const icon = document.createElement("i")
      icon.classList.add("fa-solid", "fa-star"); 
    
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.appendChild(icon)
      const h1 = document.createElement("h1");
      h1.textContent = data.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${data.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${data.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      icon.onclick = () => {
        if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
       } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        const index = arrayNum.indexOf(movieId);
          if (index !== -1) {
              arrayNum.splice(index, 1);
              // newLocal.splice(id)
              localStorage.setItem("arrayID",JSON.stringify(arrayNum)); 
       }
       card.style.display="none"
      }
      };
      if (data.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${data.genre.name}`;
        card.appendChild(genero);
      }

      card.appendChild(duracion);

     
    // });
  })
})
};
