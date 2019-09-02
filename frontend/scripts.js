fetch('http://localhost:3000') //A J A X
.then(res=>res.text())
.then(res=>{
    document.querySelector('.res').innerHTML=res
})
.catch(error=>console.log(error))
