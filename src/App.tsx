import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { ProgressProvider } from '@/features/progress/ProgressContext'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { LearnPage } from '@/pages/LearnPage'
import { LessonPage } from '@/pages/LessonPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { TracksPage } from '@/pages/TracksPage'

export function App() {
  return (
    <ProgressProvider>
      <Routes>
        {/* Lessons are full-screen: no nav to click away to mid-question. */}
        <Route path="/track/:trackId/unit/:unitId" element={<LessonPage />} />

        <Route element={<AppLayout />}>
          <Route index element={<TracksPage />} />
          <Route path="track/:trackId" element={<LearnPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ProgressProvider>
  )
}
