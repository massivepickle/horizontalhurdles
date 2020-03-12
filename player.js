class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.yp = 0;
        this.name = null;
        this.rank = null;
    }

    getCount(){
        var p = database.ref('playercount');
        p.on("value",function(data){
            playercount = data.val();
        });
    }

    getRank(){
        var g = database.ref('rank');
        g.on("value",function(data){
            ranq = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            playercount: count
        });
    }

    updateRank(r){
        database.ref('/').update({
            rank: r
        });
    }

    update(){
        var playerindex = "players/player"+this.index;
        database.ref(playerindex).set({
            name: this.name,
            distance: this.distance,
            yd: this.yp,
            rank: this.rank
        });
    }

    static getAllPlayer(){
        var playersinfo = database.ref('players');
        playersinfo.on("value",(data)=>{
            allPlayer = data.val();
        });
    }
}