let categories=document.getElementById("categories");
let list=["All","Music","Meditation Music","Romantic Music","Live","Plants","4K resolution","Rain","Playlists","Oceans","New","CSS","Jazz","Bmw","Sports","Bike","New"];
function catagory(list){
    for(let i=0;i<list.length;i++){
        let item=document.createElement("span");
        item.innerText=list[i];
        item.className="items"
        item.addEventListener("click",()=>{
            if(item.style.background!="black"){
            item.style.background="black";
            item.style.color="white";}
            else{item.style.background=" #f2f2f2";
            item.style.color="black";}
        })
        categories.append(item);

    }
}
catagory(list);