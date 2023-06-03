
// //Container extraction
let contentArea=document.getElementById("content_area");
let searchButton=document.getElementById("searchButton");
searchButton.addEventListener("click",callData);
loadData()


function callData(){
    loadData()
}


async function loadData(){
    try{
        contentArea.innerText=" ";
        
        let searchValue=document.getElementById("search").value;
        if(!searchValue){searchValue="all";}
        // console.log(searchValue,"clicked")
        let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchValue}&key=AIzaSyAKtX6Ds8cf2PvvmMOIXxGIbN8g-oEmKEM`
    // 
        let response = await fetch(url) ;
        let data= await response.json();
        createContent(data.items);
    }catch(error){
        console.log("something went wrong : "+error)
    }
    
}
function validator(key,obj){
    return key in obj?obj[key]:"NA";
}
function createContent(data){//data is arrays

    for(let i=0;i<data.length;i++){
  
        let videoId=validator("videoId",data[i].id);
        let videoTitle=validator("title",data[i].snippet);
        let videoThumbnail= validator("url",data[i].snippet.thumbnails.high);
          
        //Card Creation
        //card contianer
        let cardContainer=document.createElement("div");
        cardContainer.className="card_container";

        //card upper
        let cardUpper=document.createElement("div");
        cardUpper.className="card_upper";

        //card upper img
        let cardUpperImg=document.createElement("img");
        cardUpperImg.src=`${videoThumbnail}`;
        cardUpper.append(cardUpperImg);

        //card lower
        let cardLower=document.createElement("div");
        cardLower.className="card_lower";

        //lower left
        let lowerLeft=document.createElement("div");
        lowerLeft.className="lower_left"

        //lower left img
        let lowerLeftImg=document.createElement("img");
        lowerLeftImg.src="./Logos/icons8-female-profile-50.png";
        lowerLeftImg.style.height="50px";
        lowerLeftImg.style.width="50px";
        lowerLeft.append(lowerLeftImg);
        

        //lower right
        let lowerRight=document.createElement("div");
        lowerRight.className="lower_right";

        //lower right para
        let lowerRightPara=document.createElement("p");
        lowerRightPara.innerText=`${videoTitle.substr(0,76)}+...`;
        lowerRight.append(lowerRightPara);

        //lower right div
        let lowerRightDiv=document.createElement("div");
        lowerRightDiv.className="video_details";

        //right div 2 para
        let para1=document.createElement("p");
        let para2=document.createElement("p");
        para1.innerText="Soothing Relaxation";
        para2.innerText="$6M views • 5 years ago";

        lowerRightDiv.append(para1);
        lowerRightDiv.append(para2);

        lowerRight.append(lowerRightDiv);

        cardLower.append(lowerLeft);
        cardLower.append(lowerRight);

        cardContainer.append(cardUpper);
        cardContainer.append(cardLower);

        contentArea.append(cardContainer);

        cardContainer.addEventListener("click",(event)=>{openVideo(videoId)});
    } 
     
 
}


function openVideo(videoId){
    // console.log("hi");
    // document.cookie = `id=${videoId};max-age=3; path=./videoPage.html`;
    localStorage.setItem("id",`${videoId}`);
    window.location.href="http://127.0.0.1:5500/videoPage.html";
}
 
