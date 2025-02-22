import React from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import ConferenceThemes from './components/ConferenceThemes';
import Programme from './components/Programme';
import Registration from './components/Registration';
import ConferenceProceedings from './components/ConferenceProceedings';
import DistinguishedSpeaker from './components/DistinguishedSpeaker';
import Committee from './components/Committee';
import Venue from './components/Venue';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Downloads from './components/Downloads';
import ConferenceSchedule from './components/ConferenceSchedule';
import CallForPapers from './components/CallForPapers';
import InstructionsToAuthors from './components/InstructionsToAuthors';
import Accomodation from './components/Accomodation';
import Tours from './components/Tours';
import Travel from './components/Travel';
import ExhibitionSponsorship from './components/ExhibitionSponsorship';
import Language from './components/Language';
import Bengaluru from './components/Bengaluru';
import Weather from './components/Weather';
import TravelChecklist from './components/TravelChecklist';
import InternationalTravel from './components/InternationalTravel';
import Transport from './components/Transport';
import Local from './components/Local';
import TravelInfo from './components/TravelInfo';
import Electricity from './components/Electricity';
import ReachIisc from './components/ReachIisc';
import Interest from './components/Interest';
import RootLayout from './components/RootLayout';
import AbstractSubmission from './components/AbstractSubmission'; 
import ConferenceRegistration from "./components/ConRegistration";
import NewUserRegistration from "./components/NewUserRegistration";
// AbstractSubmissionButton
import SubmitAbstractForm from './components/AbstractSubmissionButton';
import ForgotPassword from "./components/ForgotPassword";


// Router configuration with future flags to remove warnings
const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<About />} />
      <Route path="conference-themes" element={<ConferenceThemes />} />
      <Route path="programme" element={<Programme />} />
      <Route path="registration" element={<Registration />} />
      <Route path="conference-proceedings" element={<ConferenceProceedings />} />
      <Route path="distinguished-speaker" element={<DistinguishedSpeaker />} />
      <Route path="committee" element={<Committee />} />
      <Route path="venue" element={<Venue />} />
      <Route path="sponsors" element={<Sponsors />} />
      <Route path="contact" element={<Contact />} />
      <Route path="downloads" element={<Downloads />} />
      <Route path="conference-schedule" element={<ConferenceSchedule />} />
      <Route path="call-for-papers" element={<CallForPapers />} />
      <Route path="instructions-to-authors" element={<InstructionsToAuthors />} />
      <Route path="accomodation" element={<Accomodation />} />
      <Route path="tours-and-social-events" element={<Tours />} />
      <Route path="travel-information" element={<Travel />} />
      <Route path="exhibition-sponsorship" element={<ExhibitionSponsorship />} />
      <Route path="official-language" element={<Language />} />
      <Route path="about-bengaluru" element={<Bengaluru />} />
      <Route path="weather" element={<Weather />} />
      <Route path="travel-checklist" element={<TravelChecklist />} />
      <Route path="international-travel" element={<InternationalTravel />} />
      <Route path="transport" element={<Transport />} />
      <Route path="local-bengaluru" element={<Local />} />
      <Route path="travel-info" element={<TravelInfo />} />
      <Route path="electricity" element={<Electricity />} />
      <Route path="reach-iisc" element={<ReachIisc />} />
      <Route path="interest" element={<Interest />} />
      <Route path="abstractsubmission" element={<AbstractSubmission />} />
      {/* Added */}
      <Route path="/conference-registration" element={<ConferenceRegistration />} />
      <Route path="/register" element={<NewUserRegistration />} />
      <Route path="/submit-abstract" element={<SubmitAbstractForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      
    </Route>
  ),
  {
    // Add future flags to remove warnings
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    },
    // Optional: Add basename if you're deploying to a subdirectory
    basename: '/',
    // Optional: Add scroll restoration
    scrollBehavior: 'auto'
  }
);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;