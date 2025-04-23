const socket = io.connect(); 

function drawLine(context,x1,y1,x2,y2,color){
    context.moveTo(x1,y1); 
    context.lineTo(x2,y2); 
    context.strokeStyle = color; 
    context.stroke(); 
}; 

document.addEventListener("DOMContentLoaded",function(){
    var color; 
    document.getElementById("1").addEventListener("click", function(){
        color = "skyblue"; 
    }); 
    document.getElementById("2").addEventListener("click", function(){
        color = "mediumpurple"; 
    }); 
    document.getElementById("3").addEventListener("click", function(){
        color = "greenyellow"; 
    }); 
    document.getElementById("4").addEventListener("click", function(){
        color = "rosybrown"; 
    }); 
    const canvas = document.getElementById("canvas"); 
    const context = canvas.getContext("2d"); 
    const width = window.innerWidth;
    const height = window.innerHeight; 


    canvas.width = width; 
    canvas.height = height; 

    var x, y, oldx, oldy; 
    var bollDraw = false; 
    
    canvas.onmousedown = function(e){
        bollDraw = true; 
        oldx = x; 
        oldy = y; 
    }; 

    canvas.onmouseup = function(e){
        bollDraw = false; 
    }; 

    canvas.onmousemove = function(e){
        x = e.clientX; 
        y = e.clientY; 
        if(bollDraw){
            socket.emit("dessin",{
                "x1": oldx,
                "y1": oldy,
                "x2": x,
                "y2": y,
                "color": color
            }); 
            drawLine(context,oldx,oldy,x,y,color); 
            oldx = x; 
            oldy = y; 
        }
    }

    socket.on("dessin",function(data){
        drawLine(context,data.x1,data.y1,data.x2,data.y2,data.color); 
    })
})