import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import db from './models/index.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the Node.js JWT Authentication application.',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', userRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;

const initializeRoles = async () => {
  const roles = ['user', 'moderator', 'admin'];
  for (const role of roles) {
    await db.role.findOrCreate({
      where: { name: role },
    });
  }
};

db.sequelize.sync().then(async () => {
  await initializeRoles();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
