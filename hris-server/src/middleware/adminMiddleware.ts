export const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};