require('dotenv').config();

const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/db');

async function startServer() {
  try {
    await connectDB();

    require('./src/models');

    await sequelize.sync();

    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });

  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
}

startServer();