/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Kinetic */
var stageTail = new Kinetic.Stage(
        {
            container: "tailcontent",
            width: 256,
            height: 256
        });
        
var stageFin = new Kinetic.Stage(
        {
           container: "tailcontent",
            width: 256,
            height: 256
        });

var Texture = function (info, canvas)
{
    this.stage = canvas;
    this.kLayer = new Kinetic.Layer();
    this.kImg;
    this.imgSource = info;
    this.img;
    //this.img = new Image();
    //this.img.onload = this.imgLoad();
    //this.img.src = this.imgSource;
};

Texture.prototype.show = function ()
{
    console.log(this.imgSource + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
};

Texture.prototype.imgLoad = function ()
{
    this.kImg = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: this.img,
                width: 256,
                height: 256
            });
    this.kLayer.add(this.kImg);
    try
    {
        this.stage.add(this.kLayer);
    } catch (err)
    {
        //console.log(err);
        console.trace();
    }
    this.kImg.draw();

    //changeTextureFromCanvas();

};

Texture.prototype.addColorControls = function (sel, val, location)
{
    //console.log("here");
    var mainDiv = document.getElementById(location);
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'colors');
    
    var par = document.createElement('p');
    par.textContent = this.imgSource;
    
    var colorPicker = document.createElement('input');
    colorPicker.id = this.imgSource + "color";
    colorPicker.setAttribute("class", "colorP");
    colorPicker.type = 'text';
    colorPicker.value = val;
    
    if(sel === true)
    {    
        var selecter = document.createElement('input');
        selecter.id = this.imgSource + "select";
        selecter.type = "checkbox";
        selecter.checked = false;
        this.kImg.hide();
        newDiv.appendChild(selecter);
    }
    
    this.color = colorPicker;
    this.select = selecter;
    //newDiv.appendChild(par);
    
    newDiv.appendChild(colorPicker);
    
    mainDiv.appendChild(newDiv);
};

Texture.prototype.changeColor = function ()
{
//    this.show();
    //var value = document.getElementById(this.imgSource + "color").value;
    //console.log("here");
    var value = this.color.value;
    this.kImg.cache();

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    this.kImg.filters([Kinetic.Filters.RGB]);
    this.kImg.blue(B).red(R).green(G);

    this.kImg.draw();

    //changeTextureFromCanvas();
};

Texture.prototype.toggle = function()
{
    if(this.select.checked)
    {
        this.kImg.show();
        this.stage.draw();
    }
    
    else
    {
        this.kImg.hide();
        this.stage.draw();
    }
    
    changeTextureFromCanvas();
};




var imgTailPaths = [];
imgTailPaths[0] = "img/classic/skin.png";
imgTailPaths[1] = "img/classic/tailbase.png";
imgTailPaths[2] = "img/classic/tailTummy.png";
imgTailPaths[3] = "img/classic/spots.png";
imgTailPaths[4] = "img/classic/stripes.png";

var imgFinPaths = [];
imgFinPaths[0] = "img/classic/flukeBase.png";
imgFinPaths[1] = "img/classic/flukesides.png";
imgFinPaths[2] = "img/classic/flukespots.png";
imgFinPaths[3] = "img/classic/fluketummy.png";
imgFinPaths[4] = "img/minimal/flukespots.png";
imgFinPaths[5] = "img/minimal/fluketummy.png";


var initialColorValues = [];
initialColorValues[0] = "#704500";
initialColorValues[1] = "#aa0707";
initialColorValues[2] = "#f1ca14";
initialColorValues[3] = "#f1ca14";
initialColorValues[4] = "#190000";

var initialFinColorValues = [];
initialFinColorValues[0] = "#aa0707";
initialFinColorValues[1] = "#190000";
initialFinColorValues[2] = "#f1ca14";
initialFinColorValues[3] = "#f1ca14";
initialFinColorValues[4] = "#190000";
initialFinColorValues[5] = "#190000";

var tail = [];
var fin = [];

for(var i = 0; i < imgTailPaths.length; i++)
{
    tail[i] = new Texture(imgTailPaths[i], stageTail);
    tail[i].img = new Image();
    //tail[i].img.onload = tail[i].imgLoad();
    tail[i].img.onload = imgLoaded(tail[i]);
    tail[i].img.src = tail[i].imgSource;
    if(i < 2)
    {
        tail[i].addColorControls(false, initialColorValues[i], "control-container");
        setTailControls(i, false);
    }
    
    else
    {
        tail[i].addColorControls(true, initialColorValues[i], "control-container");
        setTailControls(i, true);
    }
    
    
    //tail[i].kImg.draw();
}

for(var c = 0; c < imgFinPaths.length; c++)
{
    fin[c] = new Texture(imgFinPaths[c], stageFin);
    fin[c].img = new Image();
    //fin[c].img.onload = fin[c].imgLoad();
    fin[c].img.onload = imgLoaded(fin[c]);
    fin[c].img.src = fin[c].imgSource;
    if(c < 2)
    {
        fin[c].addColorControls(false, initialFinColorValues[c], "control-fin-container");
        setFinControls(c, false);
    }
    
    else
    {
        fin[c].addColorControls(true, initialFinColorValues[c], "control-fin-container");
        setFinControls(c, true);
    }
    //fin[c].addColorControls(true, initialColorValues[c + 1], "control-fin-container");
    
    //fin[c].kImg.draw();
}

//console.log(fin.length);

setTimeout(function() {changeTextureFromCanvas();}, 1500);

function imgLoaded(obj)
{
    obj.kImg = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: obj.img,
                width: 256,
                height: 256
            });
    obj.kLayer.add(obj.kImg);
    try
    {
        obj.stage.add(obj.kLayer);
    } catch (err)
    {
        //console.log(err);
        console.trace();
    }
    //obj.kImg.draw();

    //changeTextureFromCanvas();
};

function setTailControls(e, sel)
{
    var picker = tail[e].color;
    picker.setAttribute("onchange", "changeTextureFromCanvas()");
    
    if(sel === true)
    {
        var select = tail[e].select;
        select.setAttribute("onchange", "tail[" + e + "].toggle()");
    }
    
    
};

function setFinControls(e, sel)
{
    var picker = fin[e].color;
    picker.setAttribute("onchange", "changeTextureFromCanvas()");
    
    if(sel === true)
    {
        var select = fin[e].select;
        select.setAttribute("onchange", "fin[" + e + "].toggle()");
    }
}

function updateColors()
{
    //console.log("here");
    
    for(var i = 0; i < tail.length; i++)
    {
        //tail[i].kLayer.moveToTop();
        tail[i].changeColor();
    }
    
    for(var c = 0; c < fin.length; c++)
    {
        //fin[c].kLayer.moveToTop();
        fin[c].changeColor();
    }
};

function changeTextureFromCanvas()
{
    updateColors();
    
    stageTail.toDataURL(
            {
                callback: function (dataUrl)
                {
                    //console.log(dataUrl);
                    changeTexture(dataUrl);
                }

            }, false);
            
    stageFin.toDataURL(
            {
                callback: function (dataUrl)
                {
                    //console.log(dataUrl);
                    changeFinTexture(dataUrl);
                }

            }, false);
}
;

//test.loadImage();
function hexToR(h)
{
    return parseInt((cutHex(h)).substring(0, 2), 16);
}
;

function hexToG(h)
{
    return parseInt((cutHex(h)).substring(2, 4), 16);
}
;

function hexToB(h)
{
    return parseInt((cutHex(h)).substring(4, 6), 16);
}
;

function cutHex(h)
{
    return (h.charAt(0) === "#") ? h.substring(1, 7) : h;
}
;


