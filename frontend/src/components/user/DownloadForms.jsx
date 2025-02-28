import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { PiCellSignalFull } from 'react-icons/pi';
import NavBar from './NavBar';
import ApplicationForm from './ApplicationForm';
import AnimatedComponent from "../animations/AnimatedComponent";
const DownloadForms = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showApplicationForm, setShowApplicationForm] = React.useState(false);

  const documents = [
    {
      title: "Application Form",
      date: "01-01-2024",
      type: "PDF"
    },
    {
      title: "Letter of Authenticity",
      date: "01-01-2024",
      type: "PDF"
    },
    {
      title: "Terms and Conditions",
      date: "01-01-2024",
      type: "PDF"
    },
    {
      title: "Payment Receipt",
      date: "01-01-2024",
      type: "PDF"
    }
  ];

  const handleView = (docTitle) => {
    if (docTitle === "Application Form") {
      setShowApplicationForm(true);
    }
  };

  const handleDownload = (docTitle) => {
    // Implement download functionality here
    console.log(`Downloading ${docTitle}`);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />    

      {/* Main Content */}
      <AnimatedComponent>
      <div className="max-w-4xl mx-auto px-4 py-8 ">
        <h1 className="text-3xl font-bold text-center mb-2">Download Forms</h1>
        <p className="text-center text-gray-600 mb-2">
          Thank you for booking your plot with us. Below are the forms you need to download and print.
        </p>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3 border-b pb-2">
            System Generated Documents
          </h2>

          <div className="space-y-6">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="text-xs font-semibold">{doc.type}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-gray-500">Generated by User on {doc.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDownload(doc.title)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Download
                  </button>
                  <button 
                    onClick={() => handleView(doc.title)}
                    className="bg-black text-white px-4 py-1 rounded-md text-sm hover:bg-gray-800"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/user/dashboard')}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Back to Booking
          </button>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ApplicationForm onClose={() => setShowApplicationForm(false)} />
      )}
      </AnimatedComponent>
    </div>
  );
};

export default DownloadForms; 