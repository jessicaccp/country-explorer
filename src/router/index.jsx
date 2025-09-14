import DetailPage from '@/pages/DetailPage'
import HomePage from '@/pages/HomePage'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/country/:name' element={<DetailPage />} />
    </Routes>
  )
}

export default AppRoutes
