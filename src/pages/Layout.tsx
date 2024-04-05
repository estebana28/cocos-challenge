import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';


export function LayoutPage() {
  return (
    <div className='layout-container'>
      <Header />
      <Outlet />
    </div>
  )
}