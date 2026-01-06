import cron from 'node-cron';
import { supabase } from '../config/supabase.js';

cron.schedule('0 4 * * *', async () => {
  await supabase
    .from('teacher_remarks')
    .delete()
    .lt('remark_date', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000));
});
