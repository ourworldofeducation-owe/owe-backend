import { supabase } from '../config/supabase.js';

export async function markAttendance(req, res) {
  try {
    console.log('Received attendance data:', req.body);

    let records = req.body;

    // Handle both array and single object
    if (!Array.isArray(records)) {
      records = [records];
    }

    // Validate records
    const validRecords = records.filter(record => 
      record && 
      record.student_id && 
      (typeof record.present === 'boolean' || record.present === 'present' || record.present === 'absent')
    );

    if (validRecords.length === 0) {
      return res.status(400).json({ 
        error: "No valid records provided. Ensure student_id and present fields are included." 
      });
    }

    // Prepare data for insertion
    const attendanceData = validRecords.map(record => ({
      student_id: record.student_id,
      present: record.present === true || record.present === "present",
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      month: new Date().toISOString().slice(0, 7), // YYYY-MM format
      marked_by: req.user.id,
      created_at: new Date().toISOString()
    }));

    console.log('Inserting to database:', attendanceData);

    const { data, error } = await supabase
      .from('attendence')
      .insert(attendanceData)
      .select();

    if (error) {
      console.error("Database error:", error);
      return res.status(400).json({ 
        error: error.message,
        details: error.details || error.hint || 'Check table structure and foreign keys'
      });
    }

    res.json({ 
      success: true, 
      message: `${attendanceData.length} attendance records saved successfully`,
      data: data,
      count: attendanceData.length
    });
    
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: err.message 
    });
  }
}