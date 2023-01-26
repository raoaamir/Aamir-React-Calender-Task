const { Router } = require('express');
const calenderController = require('../controller/calenderController');

const router = Router();

router.get('/send/:id', calenderController.all_events)
router.get('/delete/:id' , calenderController.delete_event)
router.get('/edit/:id' , calenderController.calender_edit)
router.get('/e/:id' , calenderController.event)

router.post('/event' , calenderController.create_event);
router.put('/post/:id',calenderController.calender_update)

module.exports =router;