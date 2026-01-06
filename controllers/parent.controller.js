import { supabase } from '../config/supabase.js';

export async function getParentDashboard(req, res) {
  const parentId = req.user.id;

  const { data, error } = await supabase
    .from('parents')
    .select(`
      id,
      parent_name,
      email,
      phone_number,
    
      students (
        id,
        name,
        class_name,
        class_group,
        section,
        created_at,
         monthly_fee,
         admission_date,
        student_subjects (
          subjects (
            id,
            name,
            teacher_name
          )
        ),
        attendence (
          date,
          present
        ),
        fees (
          month,
          amount_paid,
          marked_by,
          created_at
        
        ),
        teacher_remarks (
          remark,
          remark_date
        )
      )
    `)
    .eq('id', parentId)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ data });
};

