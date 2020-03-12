class Game{
    constructor(){}
    getState(){
        var z = database.ref('gamestate');
        z.on("value",function(data){
            gamestate = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gamestate: state
        });
    }

    async start(){
        if(gamestate === 0){
            player= new Player();
            var playercountref = await database.ref('playercount').once("value");
            if(playercountref.exists()){
                playercount = playercountref.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        player.getRank();
        c1 = createSprite(100,200,20,20);
        c2 = createSprite(300,200,20,20);
        c3 = createSprite(500,200,20,20);
        c4 = createSprite(700,200,20,20);
        jumping = createSprite(500,30,10,10);
        ground = createSprite(500,0,100,10);
        c1.scale = 0.8;
        c2.scale = 0.7;
        c3.scale = 0.7;
        c4.scale = 0.7;
        c1.addAnimation("car",anime);
        c2.addAnimation("car",anime);
        c3.addAnimation("car",anime);
        c4.addAnimation("car",anime);
        cars = [c1,c2,c3,c4];
    }

    play(){
        background(rgb(0,0,0));
        image(tracki,0,0,displayWidth*5,displayHeight)
        form.hide();
        textSize(30);
        text("game start",camera.position.x,camera.position.y);
        jumping.x = camera.position.x;
        ground.x = camera. position.x;
        jumping.collide(ground);
        jumping.velocityY = jumping.velocityY + gravity;
        Player.getAllPlayer();
        var index = 0;
        var y = 140, x;
        if(allPlayer !== undefined){
            var display_pos = 130;
            for(var plr in allPlayer){
                index = index + 1;
                textSize(25);
                if(plr === "player"+1){  
                    if(plr === "player"+player.index)
                    y = y + 234 - player.yp;
                    else
                    y = y + 234;
                    if(plr === "player"+player.index)
                    fill("red");
                    else
                    fill("black");
                    text(allPlayer[plr].rank,8650,y);
                }
                else if(plr === "player"+2){
                    if(plr === "player"+player.index)
                    y = y + 233 - player.yp;
                    else
                    y = y + 233;
                    if(plr === "player"+player.index)
                    fill("red");
                    else
                    fill("black");
                    text(allPlayer[plr].rank,8650,y);
                }
                else if(plr === "player"+3){  
                    if(plr === "player"+player.index)
                    y = y + 216 - player.yp;
                    else
                    y = y + 216;
                    if(plr === "player"+player.index)
                    fill("red");
                    else
                    fill("black");
                    text(allPlayer[plr].rank,8650,y);
                }
                else if(plr === "player"+4){
                    if(plr === "player"+player.index)
                    y = y + 208 - player.yp;
                    else
                    y = y + 208;
                    if(plr === "player"+player.index)
                    fill("red");
                    else
                    fill("black");
                    text(allPlayer[plr].rank,8650,y);
                }
                allPlayer[plr].yp = jumping.y;
                player.update();
                //y = y - allPlayer[plr].yp;
                x = 200 + allPlayer[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index){
                    //camera.position.x = displayWidth/2 - 50;
                    cars[index-1].y = y - jumping.y;
                    stroke(30);
                    fill("red");
                    ellipse(x+5,cars[index-1].y-17,20,20);
                    camera.position.x = cars[index-1].x;
                    if(player.distance%900 === 0 && 0 < player.distance < 7000){
                        hr = createSprite(player.distance+displayWidth/2,y,30,10);
                        hr.addImage("hurdle",hurdle);
                        hrGroup.add(hr);
                    }
                    if(hrGroup.isTouching(cars[index-1])){
                        gamestate = 2;
                    }
                }
                if(plr === "player"+player.index)
                fill("red");
                else
                fill("black");
                display_pos += 20;
                textSize(15);
                text(allPlayer[plr].name+": "+allPlayer[plr].distance,camera.position.x+130-displayWidth/2,display_pos);
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null && jumping.y < 11){
            jumping.velocityY += 12;
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null && player.distance !== "disqualified"){
            player.distance += 50;
            player.update();        
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null && player.distance > 0 && player.distance !== "disqualified"){
            player.distance -= 50;
            player.update();        
        }
        if(player.distance === 8350){
            ranq = ranq + 1;
            player.rank = ranq;
            player.updateRank(ranq);
            player.update();
        }
        if(player.distance === 8350){
            gamestate = 2;
        }
        if(player.distance > 8350 && player.rank !== null){
            player.distance = 8401;
            gamestate = 2;
        }
        if(gamestate === 1 && jumping.y-10 < ground.y){
            jumping.y = ground.y + 10;
        }
        if(player.distance === "disqualified"){
            gamestate = 2;
        }
    }

    end(){
        if(player.distance >= 8350){
            player.distance = 8401;
            player.update();
            this.update(2);
        }else{
            clear();
            gamestate = 2;
            player.distance = "disqualified";
            player.rank = "N/A";
            this.update(2);
        }
    }
}