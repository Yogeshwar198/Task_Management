import React from 'react'
import Navbar from '../components/Navbar'
import TaskStatus from '../components/TaskStatus'
import Todo from '../components/Todo'
import OnProgress from '../components/OnProgress'
import Done from '../components/Done'


const Home = () => {
    return (
        <div className='p-4'>
            <Navbar />
            <div className='flex gap-7 flex-col lg:flex-row'>
                <TaskStatus />
                <Todo />
                <OnProgress />
                <Done />
            </div>
            
        </div>
    )
}

export default Home