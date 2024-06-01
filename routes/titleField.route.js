const express = require('express');
const router = express.Router();
const tableDataService = require('../services/titleField.services');

router.post('/save', async (req, res) => {
    try {
        const savedData = await tableDataService.saveData(req.body);
        res.json({ success: true, savedData });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, error: 'Failed to save data' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedData = await tableDataService.updateData(req.params.id, req.body);
        res.json({ success: true, updatedData });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ success: false, error: 'Failed to update data' });
    }
});

router.get('/getdata', async (req, res) => {
    try {
        const data = await tableDataService.getData();
        res.json(data);
    } catch (err) {
        console.error('Error while getting data:', err.message);
        next(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await tableDataService.deleteData(id);
        // await tableDataService.renumberData(); // Renumber the remaining records
        res.json({ success: true, message: 'Data deleted and renumbered successfully' });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ success: false, error: 'Failed to delete data' });
    }
});

module.exports = router;
