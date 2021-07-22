//index.js
const express = require('express')
const router = express.Router()
const user_controller = require(`${__dirname}/../controllers/user_controller.js`)
const car_controller = require(`${__dirname}/../controllers/car_controller.js`)

router.post('/user/create',user_controller.create_user)
router.delete('/user/delete',user_controller.delete_user)
router.get('/user/get',user_controller.get_user)
router.post('/user/update',user_controller.update_user)

router.post('/car/add',car_controller.add_car)
router.delete('/car/delete',car_controller.delete_car)
router.get('/car/get',car_controller.get_car)
router.post('/car/update',car_controller.update_car)


router.post('/search-car',car_controller.search_car)
router.get('/calculate-price',car_controller.calculate_price)
router.get('/user/bookings',user_controller.user_bookings)
router.get('/car/bookings',car_controller.car_bookings)
router.post('/car/book',car_controller.car_book)

module.exports = router