import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState(null);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             const response = await axios.get('/profile', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             setUserData(response.data.userData);
    //             setProfileData(response.data.profileData);
    //         } catch (error) {
    //             console.error(error);
    //             // Handle error
    //         }
    //     };

    //     fetchProfile();
    // }, []);

    return (
        <div className="container mt-5">
            {userData && (
                <div className="card mb-3">
                    <div className="card-header">
                        <h5 className="card-title">User Information</h5>
                    </div>
                    <div className="card-body">
                        <p><strong>Name:</strong> 
                        {/* {userData.name} */}
                        </p>
                        <p><strong>Email:</strong> 
                        {/* {userData.email} */}
                        </p>
                        <p><strong>Role:</strong>
                         {/* {userData.role} */}
                         </p>
                    </div>
                </div>
            )}
            {profileData && (
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Profile Information</h5>
                    </div>
                    <div className="card-body">
                        <p><strong>Position:</strong> 
                        {/* {profileData.position} */}
                        </p>
                        <p><strong>Department:</strong> 
                        {/* {profileData.department} */}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
