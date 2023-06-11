
const postBody = document.querySelector('#main-sec');


console.log(postBody)

document.addEventListener('DOMContentLoaded', function(){
    loadPost({})
});

function loadPost(data){
    
    // let postHtml = "";
    if(data.length === 0){
        postBody.innerHTML = "<div>No Data</div>"
        console.log(postBody)
        // postBody.innerHTML = `<div class='no-data'><span>No Post currently</span></div>`
    }
}