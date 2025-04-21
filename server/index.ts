import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { appDataSource, roleRepository } from './entities/data-source.js';
import { Role, roles } from './entities/role.entity.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8081';

const corsOptions = {
  origin: CLIENT_ORIGIN,
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

const initializeRoles = async () => {
  for (const name of roles) {
    const existingRole = await roleRepository.findOneBy({ name });

    if (!existingRole) {
      const role = new Role();
      role.name = name;
      await roleRepository.save(role);
    }
  }
};

appDataSource
  .initialize()
  .then(async () => {
    console.log('Database initialized');

    await initializeRoles();
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Accepting requests from origin: ${CLIENT_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
