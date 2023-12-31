import React from 'react'
import { Home as HomeComponent} from '../components'

function Home() {
  return (
    <div 
    className='bg-repeat min-w-full min-h-screen'
    // style={{backgroundImage: new URL('https://i.pinimg.com/474x/16/ab/36/16ab367587e4af085ca85c14c4c077e7.jpg')}}
    >
      <HomeComponent />
    </div>
  )
}

export default Home