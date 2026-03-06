import { VercelRequest, VercelResponse } from '@vercel/node';
import { db, UPLOADS_DIR } from './_db.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { semester_id, courses, base64, fileName } = req.body;

      if (base64 && fileName) {
        const timestamp = Date.now();
        const safeFileName = `${timestamp}_Courses_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        fs.writeFileSync(path.join(UPLOADS_DIR, safeFileName), Buffer.from(base64, 'base64'));
      }

      const insert = db.prepare("INSERT OR REPLACE INTO courses (semester_id, dept_id, course_id, course_name) VALUES (?, ?, ?, ?)");
      const transaction = db.transaction((data) => {
        for (const c of data) {
          insert.run(semester_id, c.dept_id, c.course_id, c.course_name);
        }
      });
      transaction(courses);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload courses' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}