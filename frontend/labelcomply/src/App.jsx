import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Main pages
import RoleSelection from './pages/RoleSelection'
import OfficerVerification from './pages/OfficerVerification'
import OfficerDashboard from './pages/OfficerDashboard'

// Officer pages
import RiskMap from './pages/RiskMap'
import BusinessDetails from './pages/BusinessDetails'
import Businesses from './pages/Businesses'
import Inspection from './pages/Inspection'
import Alerts from './pages/Alerts'
import LabResults from './pages/LabResults'
import SupplyChain from './pages/SupplyChain'

// Citizen pages
import CitizenHome from './pages/CitizenHome'
import ProductScan from './pages/ProductScan'
import ProductHistory from './pages/ProductHistory'
import Complaint from './pages/Complaint'
import ComplaintTracker from './pages/ComplaintTracker'
import OfficialAlerts from './pages/OfficialAlerts'
import LanguageSetting from './pages/LanguageSetting'
import ComplianceResult from './pages/ComplianceResult'


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            MAIN ENTRY
        ========================== */}

        <Route
          path="/"
          element={<RoleSelection />}
        />


        {/* =========================
            OFFICER PORTAL
        ========================== */}

        <Route
          path="/officer"
          element={<OfficerVerification />}
        />

        <Route
          path="/dashboard"
          element={<OfficerDashboard />}
        />

        <Route
          path="/risk-map"
          element={<RiskMap />}
        />

        <Route
          path="/business/:id"
          element={<BusinessDetails />}
        />

         {/* Businesses */}
       <Route
          path="/businesses"
          element={<Businesses />}
        />

        <Route
          path="/inspection-queue"
          element={<Inspection />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/lab-results"
          element={<LabResults />}
        />

        <Route
          path="/supply-chain"
          element={<SupplyChain />}
        />


        {/* =========================
            CITIZEN PORTAL
        ========================== */}

        <Route
          path="/citizen"
          element={<CitizenHome />}
        />

        <Route
          path="/citizen/scan"
          element={<ProductScan />}
        />

        <Route
         path="/citizen/history"
         element={<ProductHistory />}
        />


        <Route
          path="/citizen/complaint"
          element={<Complaint />}
        />

        <Route
          path="/citizen/track"
          element={<ComplaintTracker />}
        />

        <Route
          path="/citizen/alerts"
          element={<OfficialAlerts />}
        />

        <Route
          path="/citizen/language"
          element={<LanguageSetting />}
        />

        <Route
          path="/citizen/result"
          element={<ComplianceResult />}
        />


        {/* =========================
            UNKNOWN ROUTE
        ========================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App