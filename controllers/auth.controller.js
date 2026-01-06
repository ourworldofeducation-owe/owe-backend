import bcrypt from 'bcrypt';
import { supabase } from '../config/supabase.js';
import { signToken } from '../config/jwt.js';

export async function parentLogin(req, res) {
  const { email, password } = req.body;

  const { data: parent } = await supabase
    .from('parents')
    .select('*')
    .eq('email', email)
    .single();

  if (!parent) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, parent.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ id: parent.id, role: 'parent' });

  res.json({
    token,
    role: 'parent',
    user: parent
  });
}

export async function adminLogin(req, res) {
  const { email, password } = req.body;

  const { data: admin } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ id: admin.id, role: 'admin' });

  res.json({
    token,
    role: 'admin',
    user: admin
  });
}
