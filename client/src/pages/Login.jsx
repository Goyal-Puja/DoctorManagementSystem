import React from 'react';
import '../styles/registerStyle.css'
import { Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async(values) => {

    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/login', values)
      window.location.reload();
      
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        message.success('Login Successfully',[1.5]);
        navigate('/');
      }      
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      message.error('Something went wrong',[1.5]);
      
    }
    
  }
  return (
    <>
    <div className='form-container'>
      <Form layout='vertical' onFinish={onfinishHandler} className="card">
        <h1 className='text-center'>Login Form</h1>
        <Form.Item label="Email" name="email">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className='p-2'>Not a user ? Register Here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
      </Form>

    </div>
   </>
  )
}
