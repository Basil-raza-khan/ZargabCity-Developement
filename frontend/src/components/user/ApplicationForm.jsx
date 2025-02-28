import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ApplicationForm = ({ onClose }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = React.useState({
    fullName: '',
    cnic: '',
    phoneNumber: '',
    email: '',
    plotNumber: '',
    plotSize: '',
    block: '',
    price: '',
    paymentPlan: 'Full Payment',
    downPayment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generatePDF = async () => {
    try {
      const form = formRef.current;
      const canvas = await html2canvas(form, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Add form data as text
      pdf.setFontSize(12);
      pdf.addPage();
      let yPos = 20;
      
      // Add title
      pdf.setFontSize(16);
      pdf.text('Application Form Details', 20, yPos);
      pdf.setFontSize(12);
      
      // Personal Information
      yPos += 20;
      pdf.text('Personal Information:', 20, yPos);
      yPos += 10;
      pdf.text(`Full Name: ${formData.fullName}`, 30, yPos);
      yPos += 10;
      pdf.text(`CNIC: ${formData.cnic}`, 30, yPos);
      yPos += 10;
      pdf.text(`Phone Number: ${formData.phoneNumber}`, 30, yPos);
      yPos += 10;
      pdf.text(`Email: ${formData.email}`, 30, yPos);
      
      // Plot Details
      yPos += 20;
      pdf.text('Plot Details:', 20, yPos);
      yPos += 10;
      pdf.text(`Plot Number: ${formData.plotNumber}`, 30, yPos);
      yPos += 10;
      pdf.text(`Plot Size: ${formData.plotSize}`, 30, yPos);
      yPos += 10;
      pdf.text(`Block: ${formData.block}`, 30, yPos);
      yPos += 10;
      pdf.text(`Price: ${formData.price}`, 30, yPos);
      
      // Payment Details
      yPos += 20;
      pdf.text('Payment Details:', 20, yPos);
      yPos += 10;
      pdf.text(`Payment Plan: ${formData.paymentPlan}`, 30, yPos);
      yPos += 10;
      pdf.text(`Down Payment: ${formData.downPayment}`, 30, yPos);

      pdf.save('application-form.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Form Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Application Form</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form Content */}
        <div ref={formRef} className="space-y-6">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CNIC</label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </section>

          {/* Plot Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Plot Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plot Number</label>
                <input
                  type="text"
                  name="plotNumber"
                  value={formData.plotNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plot Size</label>
                <input
                  type="text"
                  name="plotSize"
                  value={formData.plotSize}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Block</label>
                <input
                  type="text"
                  name="block"
                  value={formData.block}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Plan</label>
                <select
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option>Full Payment</option>
                  <option>Installments</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Down Payment</label>
                <input
                  type="text"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Form Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button 
            onClick={generatePDF}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm; 