import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('List user');
});

export const userRouter = router;
