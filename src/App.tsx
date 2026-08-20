import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { LearnPage } from '@/pages/LearnPage'
import { LessonPage } from '@/pages/LessonPage'
import { ProfilePage } from '@/pages/ProfilePage'

export function App() {
  return (
    <Routes>
      {/* Lessons are full-screen: no nav to click away to mid-question. */}
      <Route path="/lesson/:unitId" element={<LessonPage />} />

      <Route element={<AppLayout />}>
        <Route index element={<LearnPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
