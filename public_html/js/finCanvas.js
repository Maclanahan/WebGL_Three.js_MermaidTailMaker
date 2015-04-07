/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var stageFin = new Kinetic.Stage(
        {
            container: "fincontent",
            width: 256,
            height: 256
        });

var layerFinBase = new Kinetic.Layer();
var layerFinTummy = new Kinetic.Layer();
var layerFinStripes = new Kinetic.Layer();
var layerFinSpots = new Kinetic.Layer();


var imgFinBase = new Image();
var imgFinTummy = new Image();
var imgFinStripes = new Image();
var imgFinSpots = new Image();


var baseFinBase;
var baseFinTummy;
var baseFinStripes;
var baseFinSpots;


imgFinBase.src = "img/" + imageFinPath + "/flukeBase.png";
imgFinTummy.src = "img/" + imageFinPath + "/fluketummy.png";
imgFinStripes.src = "img/" + imageFinPath + "/flukesides.png";
imgFinSpots.src = "img/" + imageFinPath + "/flukespots.png";

imgFinBase.onload = function ()
{
    //console.log("here");
    baseFinBase = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: imgFinBase,
                width: 256,
                height: 256
            });

    layerFinBase.add(baseFinBase);

    stageFin.add(layerFinBase);

    sortFinLayers();
    changeFinBaseColor();
    changeFinTextureFromCanvas();
};

imgFinTummy.onload = function ()
{
    //console.log("here");
    baseFinTummy = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: imgFinTummy,
                width: 256,
                height: 256
            });

    layerFinTummy.add(baseFinTummy);

    stageFin.add(layerFinTummy);

    sortFinLayers();
    changeFinTummyColor();
    changeFinTextureFromCanvas();
};

imgFinStripes.onload = function ()
{
    //console.log("here");
    baseFinStripes = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: imgFinStripes,
                width: 256,
                height: 256
            });

    layerFinStripes.add(baseFinStripes);

    stageFin.add(layerFinStripes);

    sortFinLayers();
    changeFinStripeColor();
    changeTextureFromCanvas();
};

imgFinSpots.onload = function ()
{
    //console.log("here");
    baseFinSpots = new Kinetic.Image(
            {
                x: 0,
                y: 0,
                image: imgFinSpots,
                width: 256,
                height: 256
            });

    layerFinSpots.add(baseFinSpots);

    stageFin.add(layerFinSpots);

    sortFinLayers();
    changeFinSpotColor();
    changeFinTextureFromCanvas();
};


function sortFinLayers()
{
    layerFinBase.moveToTop();
    layerFinTummy.moveToTop();
    layerFinStripes.moveToTop();
    layerFinSpots.moveToTop();
}



function changeFinTextureFromCanvas()
{
    stageFin.toDataURL(
            {
                callback: function (dataUrl)
                {
                    changeFinTexture(dataUrl);
                }

            }, false);
}

function changeFinSpotColor()
{
    var value = document.getElementById("spotFinPicker").value;

    baseFinSpots.cache();
    //spotbase.cache();

    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);

    baseFinSpots.filters([Kinetic.Filters.RGB]);
    baseFinSpots.blue(B).red(R).green(G);

    baseFinSpots.draw();
    //spotbase.draw();

    changeFinTextureFromCanvas();
}

function changeFinBaseColor()
{
    var value = document.getElementById('baseFinPicker').value;

    baseFinBase.cache();


    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);



    baseFinBase.filters([Kinetic.Filters.RGB]);
    baseFinBase.blue(B).red(R).green(G);

    baseFinBase.draw();


    changeFinTextureFromCanvas();
}
;

function changeFinTummyColor()
{
    var value = document.getElementById('tummyFinPicker').value;

    baseFinTummy.cache();


    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);



    baseFinTummy.filters([Kinetic.Filters.RGB]);
    baseFinTummy.blue(B).red(R).green(G);

    baseFinTummy.draw();


    changeFinTextureFromCanvas();
}
;

function changeFinStripeColor()
{
    var value = document.getElementById('stripeFinPicker').value;

    baseFinStripes.cache();


    var R = hexToR(value);
    var G = hexToG(value);
    var B = hexToB(value);



    baseFinStripes.filters([Kinetic.Filters.RGB]);
    baseFinStripes.blue(B).red(R).green(G);

    baseFinStripes.draw();


    changeFinTextureFromCanvas();
}
;

function resetFin()
{
    console.log(imageFinPath);
    //imageFinPath = "minimal";
    
    //stageFin.remove(layerFinBase);
    stageFin.remove(layerFinTummy);
    stageFin.remove(layerFinStripes);
    stageFin.remove(layerFinSpots);
    
    //layerFinBase.remove(imgFinBase);
    layerFinTummy.remove(imgFinTummy);
    //layerFin
    layerFinTummy.draw();
    //imgFinBase.src = "img/" + imageFinPath + "/flukeBase.png";
    imgFinTummy = new Image();
    imgFinTummy.src = "img/" + imageFinPath + "/fluketummy.png";
    //imgFinStripes.src = "img/" + imageFinPath + "/flukesides.png";
    //imgFinSpots.src = "img/" + imageFinPath + "/flukespots.png";

    //console.log(imageFinTummy.src);

    //imgFinBase = new Image();
    //imgFinTummy = new Image();
    //imgFinStripes = new Image();
    //imgFinSpots = new Image();

//    imgFinBase.onload = function ()
//    {
//        //console.log("here");
//        baseFinBase = new Kinetic.Image(
//                {
//                    x: 0,
//                    y: 0,
//                    image: imgFinBase,
//                    width: 256,
//                    height: 256
//                });
//
//        layerFinBase.add(baseFinBase);
//
//        stageFin.add(layerFinBase);
//
//        sortFinLayers();
//        changeFinBaseColor();
//        changeFinTextureFromCanvas();
//    };
//
    imgFinTummy.onload = function ()
    {
        //console.log("here");
        baseFinTummy = new Kinetic.Image(
                {
                    x: 0,
                    y: 0,
                    image: imgFinTummy,
                    width: 256,
                    height: 256
                });

        layerFinTummy.add(baseFinTummy);

        stageFin.add(layerFinTummy);

        sortFinLayers();
        changeFinTummyColor();
        changeFinTextureFromCanvas();
    };

//    imgFinStripes.onload = function ()
//    {
//        //console.log("here");
//        baseFinStripes = new Kinetic.Image(
//                {
//                    x: 0,
//                    y: 0,
//                    image: imgFinStripes,
//                    width: 256,
//                    height: 256
//                });
//
//        layerFinStripes.add(baseFinStripes);
//
//        stageFin.add(layerFinStripes);
//
//        sortFinLayers();
//        changeFinStripeColor();
//        changeTextureFromCanvas();
//    };
//
//    imgFinSpots.onload = function ()
//    {
//        //console.log("here");
//        baseFinSpots = new Kinetic.Image(
//                {
//                    x: 0,
//                    y: 0,
//                    image: imgFinSpots,
//                    width: 256,
//                    height: 256
//                });
//
//        layerFinSpots.add(baseFinSpots);
//
//        stageFin.add(layerFinSpots);
//
//        sortFinLayers();
//        changeFinSpotColor();
//        changeFinTextureFromCanvas();
//    };
};

    function sortFinLayers()
    {
        layerFinBase.moveToTop();
        layerFinTummy.moveToTop();
        layerFinStripes.moveToTop();
        layerFinSpots.moveToTop();
    }



    function changeFinTextureFromCanvas()
    {
        stageFin.toDataURL(
                {
                    callback: function (dataUrl)
                    {
                        changeFinTexture(dataUrl);
                    }

                }, false);
    }

    function changeFinSpotColor()
    {
        var value = document.getElementById("spotFinPicker").value;

        baseFinSpots.cache();
        //spotbase.cache();

        var R = hexToR(value);
        var G = hexToG(value);
        var B = hexToB(value);

        baseFinSpots.filters([Kinetic.Filters.RGB]);
        baseFinSpots.blue(B).red(R).green(G);

        baseFinSpots.draw();
        //spotbase.draw();

        changeFinTextureFromCanvas();
    }

    function changeFinBaseColor()
    {
        var value = document.getElementById('baseFinPicker').value;

        baseFinBase.cache();


        var R = hexToR(value);
        var G = hexToG(value);
        var B = hexToB(value);



        baseFinBase.filters([Kinetic.Filters.RGB]);
        baseFinBase.blue(B).red(R).green(G);

        baseFinBase.draw();


        changeFinTextureFromCanvas();
    }
    ;

    function changeFinTummyColor()
    {
        var value = document.getElementById('tummyFinPicker').value;

        baseFinTummy.cache();


        var R = hexToR(value);
        var G = hexToG(value);
        var B = hexToB(value);



        baseFinTummy.filters([Kinetic.Filters.RGB]);
        baseFinTummy.blue(B).red(R).green(G);

        baseFinTummy.draw();


        changeFinTextureFromCanvas();
    }
    ;

    function changeFinStripeColor()
    {
        var value = document.getElementById('stripeFinPicker').value;

        baseFinStripes.cache();


        var R = hexToR(value);
        var G = hexToG(value);
        var B = hexToB(value);



        baseFinStripes.filters([Kinetic.Filters.RGB]);
        baseFinStripes.blue(B).red(R).green(G);

        baseFinStripes.draw();


        changeFinTextureFromCanvas();
    }
    ;

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