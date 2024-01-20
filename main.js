var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;




var img2 = new Image();
img2.src = '스브.png';

var currentImage = img2; //기본 이미지로 초기화

var img3 = new Image();
img3.src = '스브2.png';

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(currentImage, this.x, this.y)
    }
}

var img1 = new Image();
img1.src = '버섯.png';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    
    draw(){
        ctx.fillStyle = 'red';
       // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }

   
}

var timer = 0;
var cactus여러개 = [];
var 점프timer = 0;
var animation;


var 점프 = false;


function 프레임마다실행(){
    animation = requestAnimationFrame(프레임마다실행);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if (timer % 200 === 0){
    var cactus = new Cactus();
    cactus여러개.push(cactus);
    
}
    cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1)
        
        }
        a.x-=2;

        충돌하냐(dino, a);
        

        a.draw();
    });

    

    if (점프 == true){
        dino.y-=4;
        점프timer++;
        }
        
    
    if (점프 == false){
        if(dino.y < 200) {
            dino.y++;
        }
        
    }
    if (점프timer > 30) {
        점프 = false;
        점프timer = 0
        //이미지 변경 로직
        var originalCenterX = dino.x + dino.width / 2;
        var originalCenterY = dino.y + dino.height / 2;

        currentImage = img2; // 변경된 이미지로 설정
        dino.width = img2.width;
        dino.height = img2.height;

        // 변경된 이미지의 중심 좌표를 원래 이미지의 중심 좌표로 이동
        dino.x = originalCenterX - dino.width / 2;
        dino.y = originalCenterY - dino.height / 2;
       
    }

    dino.draw();
    
}


프레임마다실행();


 //게임 오버 시 버튼 표시
 var restartButton = document.getElementById('restartButton');
 restartButton.addEventListener('click', 재시작);


 function 재시작() {
    //게임 초기화 로직
    cactus여러개 =[];
    dino.y=200;

    //버튼 숨기기
 
    restartButton.style.display='none';

    //다시 시작할때 애니메이션 재시작
    프레임마다실행();
}



//충돌확인

function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
       
       //게임 오버 시 버튼 표시
       restartButton.style.display='block';
       
        cancelAnimationFrame(animation)

       
    }
}





document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        점프 = true;
        //이미지 변경 로직
        var originalCenterX = dino.x + dino.width / 2;
        var originalCenterY = dino.y + dino.height / 2;

        currentImage = img3; // 변경된 이미지로 설정
        dino.width = img3.width;
        dino.height = img3.height;

        // 변경된 이미지의 중심 좌표를 원래 이미지의 중심 좌표로 이동
        dino.x = originalCenterX - dino.width / 2;
        dino.y = originalCenterY - dino.height / 2;
    }
});

