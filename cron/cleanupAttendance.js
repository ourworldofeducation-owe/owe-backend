import cron from 'node-cron';
import { supabase } from '../config/supabase.js';

cron.schedule('0 3 * * *', async () => {
  await supabase
    .from('attendence')
    .delete()
    .lt('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
});
