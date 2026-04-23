import "./loadEnv.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedDefaultAdmin } from "./utils/seedAdmin.js";

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
/* ne     change*/
const path = require('path');
app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});



const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
