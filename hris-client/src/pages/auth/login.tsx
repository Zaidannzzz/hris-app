import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as AuthSlice from '../../redux/auth/AuthSlice';
import Loading from '../../components/modal/Loading';
import { requestLoginToServer } from '../../api/server/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!password || password.length <= 8) {
      setPasswordError('Please enter your password');
      return;
    }

    setIsLoading(true);
    const request = await requestLoginToServer(email, password);
    if (request === 200) {
      dispatch(AuthSlice.setAuth(true));
      localStorage.setItem('isAuth', "true");
      setIsLoading(false);
      navigate('/'); // Redirect to home page
    } else if (request === 500){
      setIsLoading(false);
      alert("Login failed");
    }
  };

  const handleRegisterClick = () => {
    window.location.href = "/auth/register"; // Redirect to register page
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${emailError && 'is-invalid'}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${passwordError && 'is-invalid'}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <button type="button" className="btn btn-secondary w-100 mt-3" onClick={handleRegisterClick}>
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default Login;
