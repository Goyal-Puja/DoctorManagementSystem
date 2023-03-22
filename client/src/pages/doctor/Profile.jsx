import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Input, TimePicker, message} from 'antd';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment'

const Profile = () => {

    const {user} = useSelector((state) => state.user);
    const [doctor , setDoctor] = useState(null);
    const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/doctor/updateProfile', { ...values, userId: user._id,
        timings:[
            moment(values.timings[0].format('HH:mm')),
            moment(values.timings[1].format('HH:mm'))
        ],
         },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
    dispatch(hideLoading())
    if(res.data.success){
      message.success(res.data.message)
      navigate('/')
    }
    else{
      message.error(res.data.success);
    }
      
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong")
    }
};

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post("/api/doctor/getDoctorInfo",{userId: params.id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
           getDoctorInfo();
           //eslint-disable-next-line
    }, []);
  return (
    <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
            <Form layout='vertical' onFinish={handleFinish} className="m-3" initialValues={{ ...doctor,
              timings:[
                  moment(doctor.timings[0], 'HH:mm'),
                  moment(doctor.timings[1], 'HH:mm'),
              ],
            }} >
            <h4>Personal Details : </h4>
                  <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                      <Form.Item label="First Name" name="firstName" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your First Name'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Last Name" name="lastName" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your Last Name'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Phone Number" name="phone" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your Phone No'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Email" name="email" required rules={[{ required:true }]} >
                        <Input type="email" placeholder='Your Email'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Website" name="website" >
                        <Input type="text" placeholder='Your Website if any'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Address" name="address" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your Address'/>
                      </Form.Item>
                      </Col>
                  </Row>
                  <h4>Professional Details : </h4>
                  <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Specialization" name="specialization" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your Specialization'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Experience" name="experience" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Experience in Year'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Fee Per Cunsaltation" name="feesPerCunsaltation" required rules={[{ required:true }]} >
                        <Input type="text" placeholder='Your Fee'/>
                      </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={8}>
                      <Form.Item label="Timings" name="timings" required rules={[{ required:true }]} >
                       <TimePicker.RangePicker format="HH:mm"/>
                      </Form.Item>
                      </Col>
                  </Row>
                  <div className='d-flex justify-content-end'>
                     <button className='btn btn-primary' type='submit'>Update</button>
                  </div>
            </Form>
        )}
    </Layout>
  )
}

export default Profile;
