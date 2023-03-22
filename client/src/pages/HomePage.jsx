import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import DoctorList from '../components/DoctorList'
import { Row } from 'antd'

const HomePage = () => {
  const [doctors , setDoctors] = useState([])

  const getUserData = async () => {
    try{
      const res = await axios.get("/api/user/getAllDoctors",{
        headers: {
         Authorization: "Bearer" + localStorage.getItem("token"),
        },
      });
       if(res.data.success){
         setDoctors(res.data.data);
       }
    }
    catch(error){
      console.log(error)
    }

  };

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <Layout>
       <h2 className='text-center'>Home Page</h2>
       <Row>
         {doctors && doctors.map((doctor) => 
           <DoctorList doctor={doctor} />)
         }
       </Row>

    </Layout>
  
  );
};
export default HomePage;