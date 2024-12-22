// const express = require('express');
// const bodyParser = require('body-parser');
// const TimeData = require('../model/timemodel');
// const WordSession = require('../model/WordSession.js');
// const router = express.Router();
// router.use(bodyParser.json());

// router.post('/api/save-time-data', async (req, res) => {
//   try {
//     const { timeStarted, timeEnded, timeTaken, tries, currentWord } = req.body; 

    
//     const timeData = new TimeData({
//       timeStarted,
//       timeEnded,
//       timeTaken,
//       tries,
//       currentWord, 
//     });

    
//     await timeData.save();
//     console.log('Request Body:', req.body);

//     res.status(200).send('Time data saved successfully');
//   } catch (error) {
//     console.error('Error saving time data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// router.get('/api/word-sessions', async (req, res) => {
//   try {
//     const sessions = await WordSession.find();
//     // Check if data exists
//     if (sessions.length === 0) {
//       return res.status(404).json({ message: 'No sessions found' });
//     }
//     res.status(200).json(sessions); // Return sessions as is
//   } catch (error) {
//     console.error('Error fetching word sessions:', error);
//     res.status(500).json({ message: 'Error fetching word sessions' });
//   }
// });



// module.exports = router;



const express = require('express');
const bodyParser = require('body-parser');
const TimeData = require('../model/timemodel');
const WordSession = require('../model/WordSession');
const router = express.Router();

router.use(bodyParser.json());

router.post('/api/save-time-data', async (req, res) => {
  try {
    const { timeStarted, timeEnded, timeTaken, tries, currentWord } = req.body;

    const timeData = new TimeData({
      timeStarted,
      timeEnded,
      timeTaken,
      tries,
      currentWord
    });

    await timeData.save();
    console.log('Request Body:', req.body);

    res.status(200).send('Time data saved successfully');
  } catch (error) {
    console.error('Error saving time data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/api/word-sessions', async (req, res) => {
  try {
    const wordSessions = await WordSession.findOne(); // Fetch the single document containing all sessions
    if (!wordSessions || wordSessions.sessions.length === 0) {
      return res.status(404).send('No word sessions found.');
    }
    res.status(200).json(wordSessions.sessions); // Return the `sessions` array
  } catch (err) {
    console.error('Error fetching word sessions:', err);
    res.status(500).send('Error fetching word sessions: ' + err.message);
  }
});




module.exports = router;
