


let videoId=document.cookie.split("=")[1];
let container=document.getElementById("main_container");
console.log(container);
openVideo(videoId);
function openVideo(videoId){
    
    loadComments(videoId);
    loadSuggestion(videoId);
}

function createData(data){   
    let leftSection=document.createElement("div");
    leftSection.className="left_section";

    let videoSection=document.createElement("div");
    videoSection.className="video_section";
    videoSection.innerHTML=`
         <iframe width="860" height="506" src="https://www.youtube.com/embed/${videoId}" title="Beautiful Day • Romantic and Beautiful Piano Music for Relaxation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;

    let commentSection=document.createElement("div");
    commentSection.className="comment_section";

    leftSection.append(videoSection);

     for(let i=0;i<data.length;i++){
        let title=data[i].snippet.topLevelComment.snippet.textDisplay;
        let authorName=data[i].snippet.topLevelComment.snippet.authorDisplayName;
        let authorImg=data[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
        // let channleUrl=data[i].snippet.topLevelComment.snippet.authorChannelUrl;
        let publish=data[i].snippet.topLevelComment.snippet.publishedAt;
    
        let comment=document.createElement("div");
        comment.className="comments";
        comment.innerHTML=`
                             <div class="left">
                                <img src=${authorImg} alt="">
                            </div>
                            <div class="right">
                                <div class="right_top">
                                    <span>@${authorName}</span>
                                    <span class="days">${publish.substr(0,10)}</span>
                                    <p>${title}</p>
                                </div>
                                <div class="right_bottom">
                                    <div class="items">
                                        <div><img src="./Logos/icons8-like-50.png" alt="" class="item"></div>
                                        <div><img src="./Logos/icons8-dislike-50.png" alt="" class="item"></div>
                                        <p>Reply</p>
                                    </div>
                                </div>
                            </div>
        `;
        commentSection.append(comment);
     }

     leftSection.append(commentSection);
     container.append(leftSection);
    

    // let rightSection=document.createElement("div");
    // rightSection.className="right_section";
    // rightSection.innerHTML=`

    // <div class="container2">
    //     <div class="left2">
    //         <img src="https://i.ytimg.com/vi/YxfnUPqWV0k/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAQGRXjZHRtTzqtVJRe-d8iNE5TUw" alt="">
    //     </div>
    //     <div class="right2">
    //         <div class="right_top2">
    //             <p>Morning Relaxing Music - Piano Music, Positive Music, Study...</p> <!-- 59+...-->
    //         </div>
    //         <div class="right_bottom2">
    //             <p>OCB Realx Music</p>
    //             <p>25M views • $ years ago</p>
    //         </div>
    //     </div>
    // </div>
    // `





}
function createSuggestions(data){
    console.log("create1");
    let rightSection=document.getElementById("right_section");
    for(let i=0;i<data.length;i++){
        let title=data[i].snippet.title
        let imgURL=data[i].snippet.thumbnails.high.url;
        let channelName=data[i].snippet.channelTitle;
        let date=data[i].snippet.publishTime;
        let container=document.createElement("div");
        container.className="container2";
        container.innerHTML=`
                    <div class="left2">
                            <img src=${imgURL} alt="">
                        </div>
                        <div class="right2">
                            <div class="right_top2">
                                <p>${title.substr(0,59)}+...</p>
                            </div>
                            <div class="right_bottom2">
                                <p>OCB Realx Music</p>
                                <p>${channelName} • ${date.substr(0,10)}</p>
                            </div>
                        </div>                
        `;
        rightSection.append(container);
    }
    console.log("create2");

}

async function loadSuggestion(videoId){
    let url=`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=${videoId}&type=video&key=AIzaSyAKtX6Ds8cf2PvvmMOIXxGIbN8g-oEmKEM`;
    
    try{
        let response = await fetch(url) ;
        let data= await response.json();
        createSuggestions(data.items)
    }catch(error){
        console.log("something went wrong : "+error)
    }
    
    console.log("loadSuggestion");
}

async function loadComments(videoId){
    let url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyAKtX6Ds8cf2PvvmMOIXxGIbN8g-oEmKEM`;
    
    try{
        let response = await fetch(url) ;
        let data= await response.json();
        console.log(data);
        createData(data.items);
    }catch(error){
        console.log("something went wrong : "+error)
    }
}