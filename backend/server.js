const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user.models');



app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));
app.use(bodyParser.json());




mongoose.connect('mongodb+srv://hassan:123@nodejsbackendcluster173.dkpwoko.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



app.post('/api/login', async (req, res) => {

    console.log('Checking login:', req.body);

    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error checking login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.post('/api/register',  async (req, res) => {

    console.log('Registering new user:', req.body);
    const  hashedPassword = await bcrypt.hash(req.body.password, 10);    
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        telephone: req.body.telephone,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
    });
    
try {
    const profile = await newUser.save();
    console.log('New user saved successfully:', profile);
    res.status(201).json({ message: 'Registration successful' });
}
catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});






app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



