import React from 'react';
import { Navbar } from '../components/navbar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container w-100 h-100">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mt-5">Welcome to HRIS</h1>
            <p className="lead text-center">Your all-in-one solution</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
