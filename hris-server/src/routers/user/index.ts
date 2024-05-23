import { Router } from 'express';
import { db } from "../../db/index";
import { verifyToken } from '../../middleware/verifyToken';

const router = Router();

// Profile view
router.post('/profile', verifyToken, async (req: any, res: any) => {
  const { userId } = req.body;
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).send('User not found');
    }
    
    const user = userDoc.data();
    
    const profileRef = db.collection('profile').where('user_id', '==', userId);
    const profileSnapshot = await profileRef.get();

    if (!profileSnapshot) {
      return res.status(404).send('Profile not found');
    }
    
    const profileDocs = profileSnapshot.docs[0];
    const profile = profileDocs.data();    

    return res.status(200).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
