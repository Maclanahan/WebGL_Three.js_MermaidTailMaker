/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var stage = new Kinetic.Stage(
        {            
            container: "cont",
            width: 256,
            height: 256
        });
        


var layerSkin = new Kinetic.Layer();
var layerBase = new Kinetic.Layer();
var layerTummy = new Kinetic.Layer();
var layerStripes = new Kinetic.Layer();
var layerSpots = new Kinetic.Layer();

var imgSkin = new Image();
var imgBase = new Image();
var imgTummy = new Image();
var imgStripes = new Image();
var imgSpots = new Image();

var baseSkin;
var baseBase;
var baseTummy;
var baseStripes;
var baseSpots;

imgSkin.src = "img/skin.png";
imgBase.src = "img/tailbase.png";
imgTummy.src = "img/tailTummy.png";
imgStripes.src = "img/stripes.png";
imgSpots.src = "img/spots.png";

imgSkin.onload = function()
{
    //console.log("here");
    baseSkin = new Kinetic.Image(
    {
        x: 0,
        y: 0,
        image: imgSkin,
        width: 256,
        height: 256
    });
    
    layerSkin.add(baseSkin);
    
    stage.add(layerSkin);
    
    sortLayers();
    changeSkinColor();
    changeTextureFromCanvas();
};

imgBase.onload = function()
{
    //console.log("here");
    baseBase = new Kinetic.Image(
    {
        x: 0,
        y: 0,
        image: imgBase,
        width: 256,
        height: 256
    });
    
    layerBase.add(baseBase);
    
    stage.add(layerBase);
    
    sortLayers();
    changeBaseColor();
    changeTextureFromCanvas();
};

imgTummy.onload = function()
{
    //console.log("here");
    baseTummy = new Kinetic.Image(
    {
        x: 0,
        y: 0,
        image: imgTummy,
        width: 256,
        height: 256
    });
    
    layerTummy.add(baseTummy);
    
    stage.add(layerTummy);
    
    sortLayers();
    changeTummyColor();
    changeTextureFromCanvas();
};

imgStripes.onload = function()
{
    //console.log("here");
    baseStripes = new Kinetic.Image(
    {
        x: 0,
        y: 0,
        image: imgStripes,
        width: 256,
        height: 256
    });
    
    layerStripes.add(baseStripes);
    
    stage.add(layerStripes);
    
    sortLayers();
    changeStripeColor();
    changeTextureFromCanvas();
};

imgSpots.onload = function()
{
    //console.log("here");
    baseSpots = new Kinetic.Image(
    {
        x: 0,
        y: 0,
        image: imgSpots,
        width: 256,
        height: 256
    });
    
    layerSpots.add(baseSpots);
    
    stage.add(layerSpots);
    
    sortLayers();
    changeSpotColor();
    changeTextureFromCanvas();
};

function sortLayers()
{
    layerSkin.moveToTop();
    layerBase.moveToTop();
    layerTummy.moveToTop();
    layerStripes.moveToTop();
    layerSpots.moveToTop();
    
    //baseSkin.draw();
}



function changeTextureFromCanvas()
{
    stage.toDataURL(
    {
        callback: function (dataUrl)
        {
            changeTexture(dataUrl);
        }

    }, false);
}

function changeSpotColor()
{
    var value = document.getElementById("spotPicker").value;
    
    baseSpots.cache();
    //spotbase.cache();

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    baseSpots.filters([Kinetic.Filters.RGB]);
    baseSpots.blue(B).red(R).green(G);
    
    baseSpots.draw();
    //spotbase.draw();
    
    changeTextureFromCanvas();
}

function changeBaseColor()
{
    var value = document.getElementById('basePicker').value;
    
    baseBase.cache();
    

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    

    baseBase.filters([Kinetic.Filters.RGB]);
    baseBase.blue(B).red(R).green(G);
    
    baseBase.draw();
    
    
    changeTextureFromCanvas();
};

function changeTummyColor()
{
    var value = document.getElementById('tummyPicker').value;
    
    baseTummy.cache();
    

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    

    baseTummy.filters([Kinetic.Filters.RGB]);
    baseTummy.blue(B).red(R).green(G);
    
    baseTummy.draw();
    
    
    changeTextureFromCanvas();
};

function changeStripeColor()
{
    var value = document.getElementById('stripePicker').value;
    
    baseStripes.cache();
    

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    

    baseStripes.filters([Kinetic.Filters.RGB]);
    baseStripes.blue(B).red(R).green(G);
    
    baseStripes.draw();
    
    
    changeTextureFromCanvas();
};

function changeSkinColor()
{
    var value = document.getElementById('skinPicker').value;
    
    baseSkin.cache();
    

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    

    baseSkin.filters([Kinetic.Filters.RGB]);
    baseSkin.blue(B).red(R).green(G);
    
    baseSkin.draw();
    
    
    changeTextureFromCanvas();
};

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