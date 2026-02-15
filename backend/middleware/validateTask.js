export const validateTask = (req, res, next) => {
  const { title, subject, priority, dueDate } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Le titre est obligatoire'
    });
  }
  
  if (!subject || subject.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'La matière est obligatoire'
    });
  }
  
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({
      success: false,
      message: 'Priorité invalide (low, medium, high)'
    });
  }
  
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({
      success: false,
      message: 'Date invalide'
    });
  }
  
  next();
};
