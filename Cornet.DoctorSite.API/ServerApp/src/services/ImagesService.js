//require color thief to extract colors from images 
const ColorThief = require('colorthief');


class ImagesService{

    constructor(){}

    //get colors from images
    async GetImageColor(Url){
        //get colors palette from specified url image
         const ColorsPlatte = await ColorThief.getPalette(Url,10) ;
        return ColorsPlatte;
    }


    async GetDominateColor(Url){
    //get colors palette from specified url image
    const color = await ColorThief.getColor(Url,10) ;
    console.log(color);
    return color;
    }
    
   
}



module.exports = ImagesService;
