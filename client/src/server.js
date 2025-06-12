import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import collabRoutes from './routes/collabRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/collaborate', collabRoutes);


app.listen(PORT, () => {
  console.log(`Backend running on PORT: ${PORT}`);

});

export default app;
