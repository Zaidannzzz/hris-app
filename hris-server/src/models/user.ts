interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'admin' | 'employee';
  created_at: Date;
  updated_at: Date;
}
