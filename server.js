import { app } from './src/app.js';
import { connectMongoDb } from './src/models/index.js';

const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err);
  process.exit(1);
});

(async () => {
  await connectMongoDb();

  app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
  });
})();
