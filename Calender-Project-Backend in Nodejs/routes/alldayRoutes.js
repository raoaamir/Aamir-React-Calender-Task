const { Router } = require('express');
const alldayController = require('../controller/alldayController');

const router = Router();


router.get('/all_events/:id' , alldayController.all_day_events)
router.get('/del/:id' , alldayController.delete_event)
router.get('/all/:id',alldayController.edit_event)
router.get('/ed/:id' , alldayController.event)
// router.get('/allday', alldayController.allday_view)
router.post('/allday' , alldayController.create_event);
router.put('/edit/:id', alldayController.update_event)

module.exports = router;