// Invoice.js
import React from 'react';
import "./Invoice.css";
import { useLocation } from 'react-router-dom';

const Invoice = () => {

    //used to retrieve the data passed as params from previous component
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedType = searchParams.get('selectedType');
    const selectedMake = searchParams.get('selectedMake');
    const duration = searchParams.get('duration');
    const hours = searchParams.get('hours');
    const discount = searchParams.get('discount');
    const collisionDamage = searchParams.get('collisionDamage');
    const liabilityInsurance = searchParams.get('liabilityInsurance');
    const rentalTax = searchParams.get('rentalTax');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const totalCharge = searchParams.get('totalCharge');


    //to print the invoice
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice-container mt-5">
            <div className="invoice-header d-flex justify-content-between align-items-center">
                <h1>Invoice</h1>
                <button className="btn btn-primary" onClick={handlePrint}>Print</button>
            </div>
            <div className="invoice-section">
                <h2 className='text-success'>Personal Information</h2>
                <div className="invoice-details">
                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                </div>
            </div>
            <div className="invoice-section">
                <h2 className='text-success'>Booked Car Details</h2>
                <div className="invoice-details">
                    <p><strong>Type:</strong> {selectedType}</p>
                    <p><strong>Make:</strong> {selectedMake}</p>
                </div>
            </div>
            <div className="invoice-section">
                <h2 className='text-success'>Booking Details</h2>
                <div className="invoice-details">
                    <p><strong>Duration (in days):</strong> {duration}</p>
                    <p><strong>Duration (in hours):</strong> {hours}</p>
                    <p><strong>Discount:</strong> {discount} %</p>
                    <p><strong>Collision Damage:</strong> {collisionDamage}</p>
                    <p><strong>Liability Insurance:</strong> {liabilityInsurance}</p>
                    <p><strong>Rental Tax:</strong> {rentalTax}</p>
                </div>
            </div>
            <div className="invoice-footer">
                <p><strong>Total Charge:</strong> {totalCharge} $</p>
            </div>
        </div>
    );
};

export default Invoice;
