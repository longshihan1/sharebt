'use strict'

var ShareTxt = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.bttitle = obj.bttitle;
        this.btarea = obj.btarea;
        this.author = obj.author;
    }
};

ShareTxt.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheLetter = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new ShareTxt(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheLetter.prototype ={
    init:function(){

    },

    save:function(bttitle,btarea){
        if(!bttitle || !btarea){
            throw new Error("empty bttitle or btarea")
        }

        if(bttitle.length > 20 || btarea.length > 500){
            throw new Error("bttitle or btarea  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var letterItem = this.data.get(bttitle);
        if(letterItem){
            throw new Error("letter has been occupied");
        }

        letterItem = new ShareTxt();
        letterItem.author = from;
        letterItem.bttitle = bttitle;
        letterItem.btarea = btarea;

        this.data.put(bttitle,letterItem);
    },

    get:function(bttitle){
        if(!bttitle){
            throw new Error("empty bttitle")
        }
        return this.data.get(bttitle);
    }
}

module.exports = ShareTxt;