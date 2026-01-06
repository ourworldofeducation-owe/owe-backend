import { supabase } from '../config/supabase.js';

export async function createAssignment(req, res) {
  const {
    class_group,
    class_name,
    subject,
    title,
    description,
    due_date
  } = req.body;

  const { data, error } = await supabase.from('assignments').insert({
    class_group,
    class_name,
    subject,
    title,
    description,
    due_date,
    created_by: req.user.id
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ success: true, data });
}

export async function getAssignments(req, res) {
  const { class_name, class_group } = req.query;

  let query = supabase.from('assignments').select('*');

  if (class_name) query = query.eq('class_name', class_name);
  if (class_group) query = query.eq('class_group', class_group);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
}
