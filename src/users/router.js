const {Router} = require('express');
const controller = require('./controller')

const router = Router();



router.post('/userLogin',controller.userLogin)
router.get('/',controller.getUsers);
router.post("/",controller.addUser);
router.get('/:id', controller.getUserById);
router.delete('/:id',controller.removeUser);
router.put('/:id',controller.updateUser);


module.exports= router;