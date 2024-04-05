

import { LayoutPage } from './pages/Layout';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { PortfolioPage } from './pages/Portfolio';
import { WrongPathPage } from './pages/WrongPath';
import { SearchPage } from './pages/Search';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="*" element={<WrongPathPage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
