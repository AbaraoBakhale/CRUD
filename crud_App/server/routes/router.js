const express=require('express');
const route=express();

const services=require('../services/render');
const controller=require('../controller/controller')

route.get('/',services.homeRoutes);
/**
 * @description Root Route
 * @method GET/
 */

route.get('/add-user',services.add_user);
/**
 * @description Add Users
 * @method GET/add user
 */
route.get('/update-user',services.update_user)
    /**
 * @description Update Users
 * @method GET/update_user
 * //*/
//  Create API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);




module.exports=route;