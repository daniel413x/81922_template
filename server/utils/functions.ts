import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { UploadedFile } from 'express-fileupload';

export function assignBodyAndProcessImages(req: Request) {
  const { body, files } = req;
  const filesKeys = Object.keys(files);
  for (let k = 0; k < filesKeys.length; k += 1) {
    if (/img/.test(filesKeys[k])) {
      const imgProperty = filesKeys[k].substring(3).replace(/^\D/, (c) => c.toLowerCase());
      const fileName = `${uuidv4()}.jpg`;
      body[imgProperty] = fileName;
      const img = files[filesKeys[k]] as UploadedFile;
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      break;
    }
  }
  return body;
}

export function utilFuncTwo(param: any) {
  const returned = param;
  return returned;
}
