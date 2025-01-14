import fs from 'fs';
import multer from 'multer';

import { config } from '../configs/config.js';
import { catchError } from '../utils/error.util.js';

const { uploadDir } = config.storage;

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    !fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir);
    callback(null, uploadDir);
  },
  filename: function (_req, file, callback) {
    const uniqueSuffix = `${Date.now()}.${Math.round(Math.random() * 1000)}`;
    callback(null, `${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage: storage });

export const uploadMiddleware = (fieldName) => catchError(upload.single(fieldName));

export const uploadCustomMiddleware = (method, ...params) => catchError(upload[method](...params));
