const submitButton = document.querySelector(".glow-on-hover");
const text_container = document.querySelector('.text-container');
const go_back = document.querySelector('.go-back');
const inputEle = document.querySelector('.input-taker>input');
const enterMsgBtn = document.querySelector('.button-29');
const chat_inp = document.getElementById("chat-inp");
const chat_display = document.querySelector('.chat-display');
var socket = io();






chat_inp.addEventListener("mouseenter",()=>{
    if(chat_inp.value != ''){
        chat_inp.disabled = true;
    };
})
   




function updateTime(){
    const dateEle = document.getElementById("curr-time");
    if(dateEle!=null){
        dateEle.innerHTML=new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
        setTimeout(()=>{
          updateTime();
        },10000);
    }
}
function renderData(){
    updateTime();
    const headerEle = document.querySelector('nav>h3:first-child');
    headerEle.innerHTML=`Welcome back ${inputEle.value.toUpperCase()}!`;
}
submitButton.addEventListener("click",()=>{
    if(inputEle.value==""){
        alert("Kindly fill in a name!");
        return;
    }
  text_container.style.display='none';
  document.querySelector('.chat-ui').style.display="block";
  renderData();
});
go_back.addEventListener("click",()=>{
   
    document.querySelector('.chat-ui').style.display="none";
    text_container.style.display='flex';

});


chat_inp.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
        let data={
            id:socket.id,
            username:inputEle.value,
            message:chat_inp.value
        };
        socket.emit('emit-msg',data);
        renderMessage(data,"sent");
    }
  });

enterMsgBtn.addEventListener("click",()=>{
   
    let data={
        id:socket.id,
        username:inputEle.value,
        message:chat_inp.value
    };
    socket.emit('emit-msg',data);
    renderMessage(data,"sent");
});

socket.on('emit-msg',(data)=>{
   
   
       if(data.id!==socket.id)renderMessage(data,"received");
       
    
})


function renderMessage(data,className){
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(className);
    if(className==="sent")msgDiv.innerHTML=`me:${data.message}`;
    else msgDiv.innerHTML=`${data.username}:${data.message}`;
    chat_display.appendChild(msgDiv);
    chat_inp.value="";
    chat_display.scrollTop = chat_display.scrollHeight;


}