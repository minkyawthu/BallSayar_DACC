import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

let users = [
  { phone: "1234567890", name: "John Doe" },
  { phone: "9876543210", name: "Jane Smith" }
];

app.delete('/delete', (req, res) => {
  const { phone } = req.body;

  const index = users.findIndex(user => user.phone === phone);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
