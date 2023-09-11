import { target, url } from "../scripts/variables.js";

export async function renderCard(link){
    const response = await fetch(link);
        const data = await response.json();
        target.innerHTML = `<h3 >${data.name}</h3>
                            <p>mail: ${data.email}</p>
                            <p>web: ${data.website}</p>
                            <div class='btn-container'>
                                <button class='down' id=${data.id}><</button>
                                <button class='up' id=${data.id}>></button>
                            </div>` 
        console.log(data)
    const downBtns = document.querySelectorAll('.down')
    downBtns.forEach(dnBtn => dnBtn.addEventListener('click', (e) => {
        const userID = e.target.getAttribute('id')
        const endPoint=(parseInt(userID)-1)
        if(endPoint > 0)
        renderCard(url+endPoint)
    }))
    const upBtns = document.querySelectorAll('.up')
    upBtns.forEach(upBtn => upBtn.addEventListener('click', (e) => {
        const userID = e.target.getAttribute('id')
        const endPoint=(parseInt(userID)+1)
        if(endPoint < 100)
        renderCard(url+endPoint)
    }))
}