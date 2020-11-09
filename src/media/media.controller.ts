import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Request, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { readdir, readdirSync, unlinkSync } from 'fs';
import { join, parse } from 'path';
import {diskStorage} from 'multer'
import { MediaService } from './media.service';
import { baseUrl }  from '../common/utils/config'
import jwt_decode from 'jwt-decode';
import { SellersService } from 'src/sellers/sellers.service';
import {mkdirSync} from 'fs';

import * as multer from 'jwt-decode'
import { LocalAuthGuard } from 'src/users/auth/local-auth.guard';


// export const upload = multer({
//     storage: multer.diskStorage({
//       destination: (req, file, callback) => {
//         let userId = req.user._id;
//         let path = `./public/uploads//${userId}`;
//         fs.mkdirsSync(path);
//         callback(null, path);
//       },
//       filename: (req, file, callback) => {
//         //originalname is the uploaded file's name with extn
//         callback(null, file.originalname);
//       }
//     })
//   });




@Controller('media')
export class MediaController {
    
    constructor(private readonly mediaService: MediaService) {}


    @Get('media')
    async findall(@Request() req, @Res() res) {
        console.log("current Seller Called===============")
        const header = req.headers.authorization
        const decoded = jwt_decode(header);
        const shopName = await this.mediaService.mediaSeller(decoded);
        if(shopName) {
            var directoryPath = join(process.cwd(), '/upload/'+shopName);
        } else {
            var directoryPath = join(process.cwd(), '/upload/categoryImages');
        }
        try {
                
            const path=baseUrl+'/media/image?url='+shopName+'/';
            readdir(directoryPath, function (err, files) {
                //handling error
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                } 
                //listing all files using forEach
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    console.log(file); 
                });
            });

            //console.log("__dirname=============",__dirname);

            var sync = readdirSync(directoryPath);
            //console.log("sync ===========", sync);

            var image = [];
            sync.forEach((file,index )=> { 
                image.push({
                    uid : index+1,
                    name: file,
                    status: "done",
                    url: path+file,
                })
                console.log(file); 
            }); 
            console.log("image==========", image);
            return res.json(image)
        } catch(err) {
            console.log("No Such directory file");
        }
    }

    @Get('image')
    // async seeUploadedFile(@Param('imgpath') abs, @Res() res) {
    async seeUploadedFile(@Request() abs, @Res() res) {
        
        console.log("lHeader========", abs);
        const url = abs.query.url;
        console.log("urllllllllllllll", url);
        
        // const header = abs.headers.authorization
        // const decoded = jwt_decode(header);
        // const shopName = await this.mediaService.mediaSeller(decoded);
        return res.sendFile(url, { root: 'upload/'});
    }

   
    @Post('deleteImage')
    async deleteImage(@Request() res,@Body() body) {
        const header = res.headers.authorization
        const decoded = jwt_decode(header);
        const shopName = await this.mediaService.mediaSeller(decoded);
        if(shopName) {
            var directoryPath = join(process.cwd(), '/upload/'+shopName);
        } else {
            var directoryPath = join(process.cwd(), '/upload/categoryImages');
        }
        console.log(body);
        return unlinkSync(directoryPath+'/'+body.name)
    }

    
    // async mediaSeller(@Request() req) {
            // console.log("current Seller Called===============")
            // const header = req.headers.authorization
            // const decoded = jwt_decode(header);
            // this._shopName = await this.mediaService.mediaSeller(decoded);
        // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('icon',
    {
        storage: diskStorage({
        destination: (req, file, callback) => {
            let dest = req.query.dest;
            let tmp = `upload/${dest}`;

            try {
                mkdirSync(tmp);
            }
            catch (err) {
                
            }
            callback(null, tmp);
            },
          filename: (req, file, cb) => {
          const randomName = parse(file.originalname).name.replace(" ", "-")+Date.now()+parse(file.originalname).ext;
          return cb(null, `${randomName}`)
        }
        }) 
      }))
    uploadFile(@UploadedFile() file) {
        console.log("FILE DETAILS==================",file)
        const response = {
            filename: file.originalname,
            //filename: file.filename,
        };
        console.log("response=======", response);
        console.log("file=======", file);
        return response;
    }



















}
