import { supabase } from '../config/supabase.js';
import bcrypt from 'bcrypt';


/* =========================
   ADMINS
========================= */
export async function getAdmins(req, res) {
  const { data, error } = await supabase
    .from('admins')
    .select('id, admin_name, email, role, created_at');

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
}

/* =========================
   CREATE PARENT
========================= */
export async function createParent(req, res) {
  try {
    const { parent_name, email, password, phone_number } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('parents')
      .insert([
        { parent_name, email, password: hash, phone_number }
      ])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Parent created', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* =========================
   GET ALL PARENTS
========================= */
export async function getAllParents(req, res) {
  const { data, error } = await supabase
    .from('parents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ data });
}

/* =========================
   CREATE STUDENT
========================= */
export async function createStudent(req, res) {
  try {
    const {
      parent_id,
      name,
      class_name,
      class_group,
      section,
      monthly_fee,
      admission_date
    } = req.body;

    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          parent_id,
          name,
          class_name,
          class_group,
          section,
          monthly_fee,
          admission_date
        }
      ])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Student created', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* =========================
   GET ALL STUDENTS
========================= */
export async function getAllStudents(req, res) {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      parents (
        parent_name,
        email,
        phone_number
      ),
      student_subjects!student_id (
          id,
          subject_id,
          subjects!subject_id (
            id,
            name,
            class_name,
            class_group,
            teacher_name
          )
        )
    `);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ data, message: 'Students fetched successfully',
      count: data?.length || 0 });
}

/* ===================================================
   STUDENTS WITH FEES SUMMARY (FIXED & STABLE)
=================================================== */
export async function getStudentsWithFeeSummary(req, res) {
  const { data, error } = await supabase
    .from('student_fee_summary')
    .select('*')
    .order('name');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
}


/* =========================
   SUBJECTS
========================= */
export async function getSubjects(req, res) {
  const { data, error } = await supabase
    .from('subjects')
    .select(`
      id,
      name,
      class_name,
      class_group,
      teacher_name
    `);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ data });
}

/* =========================
   CREATE SUBJECT
========================= */
export async function createSubject(req, res) {
  const { name, class_name, class_group, teacher_name } = req.body;

  const { data, error } = await supabase
    .from('subjects')
    .insert([{ name, class_name, class_group, teacher_name }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Subject added', data });
}

/* ================================
   ASSIGN SUBJECT TO STUDENT
================================ */
export async function assignSubjectToStudent(req, res) {
  const { student_id, subject_id } = req.body;

  if (!student_id || !subject_id) {
    return res.status(400).json({ error: 'student_id and subject_id required' });
  }

  const { data: exists } = await supabase
    .from('student_subjects')
    .select('id')
    .eq('student_id', student_id)
    .eq('subject_id', subject_id)
    .maybeSingle();

  if (exists) {
    return res.status(400).json({ error: 'Subject already assigned to student' });
  }

  const { data, error } = await supabase
    .from('student_subjects')
    .insert([{ student_id, subject_id }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Subject assigned successfully', data });
}

/* ================================
   GET SUBJECTS OF STUDENT
================================ */
export async function getStudentSubjects(req, res) {
  const { studentId } = req.params;

  const { data, error } = await supabase
    .from('student_subjects')
    .select(`
      id,
      subjects (
        id,
        name,
        class_name,
        class_group,
        teacher_name
      )
    `)
    .eq('student_id', studentId);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ data });
}

/* ================================
   REMOVE SUBJECT FROM STUDENT
================================ */
export async function removeStudentSubject(req, res) {
  const { id } = req.params;

  const { error } = await supabase
    .from('student_subjects')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Subject removed successfully' });
}
