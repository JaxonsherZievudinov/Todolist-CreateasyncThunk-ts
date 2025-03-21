import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import CategoryById from './pages/categories/categories-by-id/categories-by-id'
import Categories from './pages/categories/categories'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path='category/:id' element={<CategoryById />} />
      </Routes>
    </BrowserRouter>
    </Provider>

)
