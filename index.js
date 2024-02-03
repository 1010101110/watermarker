var fs = require('fs');
var path = require('path');
var jimp = require('jimp');
var ffmpeg = require('ffmpeg');


async function doit(){
    var files = fs.readdirSync(__dirname,{withFileTypes:true})
    var logoobj = await jimp.read('resource/logo.png')
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if(f.isFile()){
            const fext = path.extname(f.name);

            try{
                //image files
                if(fext === '.jpg'){
                    let fobj = await jimp.read(f.name)
                    fobj.composite(logoobj,512,512)
                    fobj.write('output/watermarked/'+f.name)
                    fs.renameSync(f.name,'output/clean/'+f.name)
                    console.log('image processed ' + f.name)
                }

                //video files
                if(fext === '.mp4'){
                    const vobj = await new ffmpeg(f.name)
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