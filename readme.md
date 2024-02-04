# Watermarker

this is a very simple free nodejs script that will process images and videos to add a watermark

# dependencies

nodejs for scripting

jimp for processing images

ffmpeg for processing videos

# Install

1. download this repo
2. Download ffmpeg https://ffmpeg.org/download.html , place ffmpeg.exe into your path or directly into this watermarker folder
3. if you don't have nodejs installed install that, https://nodejs.org/en/download
4. create your watermark image in krita, gimp, or other editor
5. save your watermark.png into the watermarker folder

# Operation

1. put images and video files into watermarker/input folder
2. open a cmd / terminal / powershell run the script `node index.js`
3. find your processed files in the watermarker/output folder
4. output clean folder has copies of the original processed files
5. output watermarked folder has the files with watermark applied