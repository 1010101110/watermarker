const fs = require('fs');
const path = require('path');
const jimp = require('jimp');
const ffmpeg = require('ffmpeg');

//npm install jimp
//npm install ffmpeg
//install ffmpeg.exe binary from its website and throw it in this folder
//place your watermark image into this folder and name it watermark.png
//place image/video files directly into the /input folder
//in command line run: node index.js
//watermarked and clean images are placed in /output folder

async function doit(){
    //read input directory
    var files = fs.readdirSync('input/',{withFileTypes:true})
    //open watermark
    var logoobj = await jimp.read('watermark.png')
    //loop through files in directory
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if(f.isFile()){
            const fext = path.extname(f.name);

            try{
                //image files
                if(fext === '.jpg' || fext === '.png' || fext === '.gif'){
                    const fobj = await jimp.read('input/'+f.name)
                    fobj.composite(logoobj,512,512)
                    fobj.write('output/watermarked/'+f.name)
                    fs.renameSync('input/' + f.name,'output/clean/'+f.name)
                    console.log('image processed ' + f.name)
                }

                //video files
                if(fext === '.mp4'){
                    const vobj = await new ffmpeg('input/'+f.name)
                    await vobj.fnAddWatermark('resource/logo.png','output/watermarked/' + f.name, {position:'C',margin_east:250})
                    fs.renameSync(f.name,'output/clean/'+f.name)
                    console.log('video processed ' + f.name)
                }
            }catch(ex){
                console.log('error processing file ' + f.name)
                console.log(ex)
            }
        }
    }

    console.log('done');
}

doit();