import { supabase } from '../config/supabase.js';

export async function addRemark(req, res) {
  const { student_id, remark } = req.body;

  const { data, error } = await supabase.from('teacher_remarks').insert({
    student_id,
    remark,
    remark_date: new Date(),
    marked_by: req.user.id
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ success: true, data });
}
