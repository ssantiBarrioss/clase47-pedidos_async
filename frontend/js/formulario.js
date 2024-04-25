
window.onload = () => {

    const title = document.getElementById('title');
    const rating = document.getElementById('rating');
    const awards = document.getElementById('awards');
    const release_date = document.getElementById('release_date');
    const length = document.getElementById('length');
    const updateButton = document.getElementById('updateButton');
    const createButton = document.getElementById('createButton');
    const deleteButton = document.getElementById('deleteButton');

    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const movieId = searchParams.get('id');
//Detalle de una pelicula
if(movieId){
    fetch(`http://localhost:3031/api/movies/${movieId}`)
    .then((response)=>response.json())
    .then((pelicula)=>{
        if(pelicula){   
        createButton.style.display ='none'
        let data = pelicula.data
        title.value = data.title
        rating.value = data.rating
        awards.value = data.awards
        release_date.value = data.release_date.split('T')[0]
        length.value = data.length
    }
    })
}else{
    createButton.style.display = '';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';
}
//Crear una pelicula
    createButton.onclick = (e)=>{
        e.preventDefault()
        const newMovie ={
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value
        }
        fetch("http://localhost:3031/api/movies/create/",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
        .then((response)=> response.json())
        .then((data)=>{
            if(data){
                window.location.href ="http://127.0.0.1:5500/frontend/home.html"
            }else{
                const msj = document.createElement("h1")
                msj.textContent= "Cargando..."
            }
        })
    }
//Actualizar una pelicula
    updateButton.onclick =(e)=>{
        e.preventDefault()
        const id = movieId
        const editMovie ={
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value
        }
        console.log("id...",id);
        fetch(`http://localhost:3031/api/movies/update/${id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        })
        .then((response)=> response.json())
        .then(data =>{
            if(data){
                window.location.href ="http://127.0.0.1:5500/frontend/home.html"
            }else{
                const msj = document.createElement("h1")
                msj.textContent= "Cargando..."
            }
        })
    }
//Borrar una pelicula   
    deleteButton.addEventListener("click", (e => {
        e.preventDefault()
        const id = movieId
        fetch(`http://localhost:3031/api/movies/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
    
        }).then((response)=> response.json())
        .then(data => {
            if(data){
                window.location.href ="http://127.0.0.1:5500/frontend/home.html"
            }else{
                const msj = document.createElement("h1")
                msj.textContent= "Cargando..."
            }
        })
       
    }))

}