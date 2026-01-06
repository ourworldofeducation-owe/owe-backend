import { supabase } from '../config/supabase.js';

export async function addFee(req, res) {
  const { student_id, month, amount_paid } = req.body;

  const { data, error } = await supabase.from('fees').insert({
    student_id,
    month,
    amount_paid,
    marked_by: req.user.id
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ success: true, data });
}

export async function getStudentFees(req, res) {
  const { student_id } = req.params;

  const { data, error } = await supabase
    .from('fees')
    .select('*')
    .eq('student_id', student_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
}
