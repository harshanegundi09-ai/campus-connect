import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Header } from '@/components/Header';
import { ListingDetailModal } from '@/components/ListingDetailModal';
import { CreateListingModal } from '@/components/CreateListingModal';
import { RequestModal } from '@/components/RequestModal';
import { MessagingDrawer } from '@/components/MessagingDrawer';
import { DashboardModal } from '@/components/DashboardModal';
import { CampusMapModal } from '@/components/CampusMapModal';
import { PaymentQRModal } from '@/components/PaymentQRModal';
import { ReviewModal } from '@/components/ReviewModal';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';
import { ReportLostModal } from '@/components/ReportLostModal';
import { ToastNotification } from '@/components/ToastNotification';

export const metadata: Metadata = {
  title: 'CampusNexus | Student Services, Resources & Opportunities Exchange',
  description: 'Exchange textbooks, design services, video editing, tutoring, study notes, and collaborate on campus hackathons with verified students.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          
          {/* Modals & Overlays */}
          <ListingDetailModal />
          <CreateListingModal />
          <RequestModal />
          <MessagingDrawer />
          <DashboardModal />
          <CampusMapModal />
          <PaymentQRModal />
          <ReviewModal />
          <DocumentViewerModal />
          <ReportLostModal />
          <ToastNotification />

          {/* Footer */}
          <footer className="border-t border-slate-200 bg-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">CampusNexus</span> &bull; <span>Built by students for college communities</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <span>📚 Resources &amp; Notes</span>
                <span>🎨 Student Services</span>
                <span>🚀 Project Collab</span>
                <span>📋 Lost &amp; Found</span>
                <span>🚗 Carpools</span>
                <span>🛡️ Safe Zones</span>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
