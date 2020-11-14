import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Request, Req, UseGuards } from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';


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

    

    @UseGuards(JwtAuthGuard)
    @Get('media')
    async findall(@Request() req, @Res() res) {
        let dPath = req.user.sl
        if(!req.user.sl) {
            dPath = "categoryImage"
        }
        var directoryPath = join(process.cwd(), '/upload/'+dPath);
        try {
                
            const path=baseUrl+'/media/image/'+dPath+'/';
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
            var sync = readdirSync(directoryPath);
            var image = [];
            sync.forEach((file,index )=> { 
                image.push({
                    uid : index+1,
                    name: dPath+'/'+file,
                    status: "done",
                    url: path+file,
                })
                console.log(file); 
            }); 
            // console.log("image==========", image);
            return res.json(image)
        } catch(err) {
            console.log("No Such directory file");
        }
    }

    @Get('image/:abs*')
    seeUploadedFile(@Param("abs")abs,@Req() req, @Res() res) {
        let imgPath = req.path.split('/')[4]        
        return res.sendFile(abs+'/'+imgPath, { root: 'upload' });
    }
    
    // @Get('image')
    // async seeUploadedFile(@Request() abs, @Res() res) {
    //     const url = abs.query.url;
    //     return res.sendFile(url, { root: 'upload/'});
    // }

   
    @UseGuards(JwtAuthGuard)
    @Post('deleteImage')
    async deleteImage(@Request() req,@Body() body) {
        const directoryPath = join(process.cwd(), '/upload/');
        return unlinkSync(directoryPath+'/'+body.name)
    }

    
    // async mediaSeller(@Request() req) {
            // console.log("current Seller Called===============")
            // const header = req.headers.authorization
            // const decoded = jwt_decode(header);
            // this._shopName = await this.mediaService.mediaSeller(decoded);
        // }

    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
    {
        storage: diskStorage({
        destination: (req, file, callback) => {
            // console.log("IMG UPDATE===========================",req.user['sl']);
            // const shopName = await this.mediaService.mediaSeller(req.user);
            let slId = req.user['sl']
            if(!req.user['sl']) {
                slId = "categoryImage"
            }
            // let dest = req.query.dest;
            let tmp = `upload/${slId}`
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
        };
        return response;
    }



















}
