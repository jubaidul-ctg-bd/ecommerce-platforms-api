import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './categorySchema/category.entity';
import { Connection } from 'typeorm';
import { productCreateMiddleware } from 'src/products/middleware/productCreate.middleware';
import { productUpdateMiddleware } from 'src/products/middleware/productUpdate.middleware';
import { categoryCreateMiddleware } from './middleware/categoryCreate.middleware';
import { categoryUpdateMiddleware } from './middleware/categoryUpdate.middleware';
@Module({

    imports: [TypeOrmModule.forFeature([Category],'ebhubon')],
    controllers: [ CategoryController],
    providers: [ CategoryService],
    exports: [CategoryService,]




})
export class CategoryModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(categoryCreateMiddleware)
        .forRoutes({path: 'category/create',method:RequestMethod.POST},
        {path: 'category/createCategory',method:RequestMethod.POST});
        // consumer
        // .apply(categoryUpdateMiddleware)
        // .forRoutes({path: 'products/delete',method:RequestMethod.PUT},
        // {path: 'products/update',method:RequestMethod.PUT});
  
    //   consumer
    //   .apply(CatUpdatedMiddleware)
    //   .exclude(
    //   { path: 'cats/registration', method: RequestMethod.POST }
    //  )
    //  .forRoutes(CatsController);
    }
}
