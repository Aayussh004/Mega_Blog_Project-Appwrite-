import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'//for checking if user is logged in or not from store
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)//store me se dekho ki user ka ky status h
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",//means url kha pe jaa rha h
      active: true//status batayega
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,//agr user phle se logged in hai to ye login wala navigation nhi dikhega
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,//isiliye login signup ke status ko deactivate or false kr diye hai
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>

            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}//agr login click hota hai to user ko login wala url me navigate krwa do jo ki slug h
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}

            {authStatus && (//agr banda logged in h phle se to usko login,signup na dikha ke logout btn to dikhana pdega na meri jaan
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header