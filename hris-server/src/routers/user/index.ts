import { Router } from 'express';
import { db } from "../../db/index";
import { verifyToken } from '../../middleware/verifyToken';

const router = Router();

// Profile view
router.get('/profile', verifyToken, async (req: any, res: any) => {
  const { userId } = req.params;
  try {

    if (req.user.role === 'admin' && req.user.id !== userId) {
      return res.status(403).send('Access denied. You can only view your own profile.');
    }
  
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
  
    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }
  
    const user = userDoc.data();
  
    const profileRef = db.collection('profiles').where('user_id', '==', userId);
    const profileSnapshot = await profileRef.get();
  
    let profile;
  
    profileSnapshot.forEach(doc => {
      profile = doc.data();
    });
  
    return res.status(200).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
