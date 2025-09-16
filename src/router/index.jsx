import Layout from '@/components/Layout'
import CountryPage from '@/pages/CountryPage'
import HomePage from '@/pages/HomePage'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/country/:name' element={<CountryPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
