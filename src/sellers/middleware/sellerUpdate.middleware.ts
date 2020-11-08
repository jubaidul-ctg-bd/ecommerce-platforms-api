import { Injectable, NestMiddleware } from '@nestjs/common';
import { exit } from 'process';
import {Request} from 'express'

@Injectable()
export class sellerUpdateMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log("UPDATED MIDDLEWARE HAVE BEEN CALLED");
    var updatedby = req.body.username
    var updatedat = new Date()
    req.body.UpdatedBy = updatedby
    req.body.UpdatedAt = String(updatedat)
    next();
  }
}
