import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { DashboardPage } from '../views/DashboardPage'
import { SimulatorPage } from '../views/SimulatorPage'
import { BatchUploadPage } from '../views/BatchUploadPage'
import { StudentsPage } from '../views/StudentsPage'
import { StudentDetailPage } from '../views/StudentDetailPage'
import { NotFoundPage } from '../views/NotFoundPage'

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path='simulador' element={<SimulatorPage />} />
                    <Route path='carga-masiva' element={<BatchUploadPage />} />
                    <Route path='estudiantes' element={<StudentsPage />} />
                    <Route path='estudiantes/:id' element={<StudentDetailPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
