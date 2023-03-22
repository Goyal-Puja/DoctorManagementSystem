import Layout from '../components/Layout'
import React from 'react';
import {Tabs} from 'antd';
import { useSelector } from 'react-redux';

const Notification = () => {

     const { user } = useSelector((state) => state.user);
     const handleMarkAllRead = () => {};
     const handleDeleteAllRead = () => {};
  return (
    <Layout>
        <h4 className='p-3 text-center'>Notification Page</h4>
        <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className='d-flex justify-content-end'>
            <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
          </div>
          {
            user?.notification.map((notificationMgs) => (
               <div className='card' onClick={notificationMgs.onClickPath}>
                 <div className='card-text'>
                       {notificationMgs.message}
                 </div>

               </div>
            ))
          }
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className='d-flex justify-content-end'>
            <h4 className='p-2' onClick={handleDeleteAllRead}>Delete All Read</h4>
          </div>
        </Tabs.TabPane>
        </Tabs>
        
    </Layout>
  )
}

export default Notification