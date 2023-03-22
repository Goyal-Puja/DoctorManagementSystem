import React from 'react';
import '../styles/registerStyle.css'
import { Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const  Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
 const onfinishHandler = async (values) => {
  
      try {
        dispatch(showLoading());
         const res = await axios.post('/api/user/register', values)
         dispatch(hideLoading());
         if(res.data.success){
           message.success('Register Successfully !!')
           navigate('/login')
         }else{
           message.error(res.data.message);
         }


      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong');
        
      } 

 }

  return (
    <>
     <div className='form-container'>
       <Form layout='vertical' onFinish={onfinishHandler} className="card">
         <h1 className='text-center'>Register Form</h1>
         <Form.Item label="Name" name="name">
           <Input type="text" required  />
         </Form.Item>
         <Form.Item label="Email" name="email">
           <Input type="text" required  />
         </Form.Item>
         <Form.Item label="Password" name="password">
           <Input type="password" required />
         </Form.Item>
         <Link to="/login" className='p-2'>Already user ? Login Here</Link>
         <button className='btn btn-primary' type='submit'>Register</button>

       </Form>

     </div>
    </>
  )
}
export default Register;