import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestProfileToServer } from '../../api/server/profile';
import { Navbar } from '../../components/navbar';
import * as AuthSlice from '../../redux/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/modal/Loading';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('User ID not found');
          setLoading(false);
          return;
        }
        const result = await requestProfileToServer(userId);
        setUserData(result.user);
        setProfileData(result.profile);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    dispatch(AuthSlice.setAuth(false));
    localStorage.setItem('isAuth', 'false');
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          {loading && <Loading />}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {userData && (
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title">User Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Role:</strong> {userData.role}</p>
            </div>
          </div>
        )}
        {profileData && (
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Profile Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Position:</strong> {profileData.position}</p>
              <p><strong>Department:</strong> {profileData.department}</p>
            </div>
          </div>
        )}
        <button className="btn btn-danger mt-5" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
