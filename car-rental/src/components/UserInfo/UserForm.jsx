import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Import CSS file for styling

const UserForm = () => {
    //useLocation is used for retrieving the car type and make passed as params
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedType = searchParams.get('type');
    const selectedMake = searchParams.get('make');

    //states for form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [duration, setDuration] = useState('');
    const [hours, setHours] = useState('');
    const [discount, setDiscount] = useState('');
    const [collisionDamage, setCollisionDamage] = useState(false);
    const [liabilityInsurance, setLiabilityInsurance] = useState(false);
    const [rentalTax, setRentalTax] = useState(false);
    const [totalCharge, setTotalCharge] = useState(null);
    const [calculatingCharge, setCalculatingCharge] = useState(false);

    // Function to check if all required fields are filled
    const isFormComplete = () => {
        return (
            firstName &&
            lastName &&
            email &&
            phone &&
            pickupDate &&
            returnDate &&
            duration &&
            hours &&
            discount
        );
    };

    //checks the days between pickup and return car date
    useEffect(() => {
        if (pickupDate && returnDate) {
            const startDate = new Date(pickupDate);
            const endDate = new Date(returnDate);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays);
        }
    }, [pickupDate, returnDate]);


    //function to calculate the charges

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!isFormComplete()) {
            alert('Please fill in all the required fields.');
            return;
        }

        // If all okay, then it sends this data to the backend to calculate
        try {
            setCalculatingCharge(true);
            const response = await axios.post('http://localhost:5000/calculateCharge', {
                selectedType,
                selectedMake,
                duration,
                hours,
                discount,
                collisionDamage,
                liabilityInsurance,
                rentalTax
            });
            // Floor the total charge
            setTotalCharge(Math.floor(response.data.totalCharge));
            setCalculatingCharge(false);
        } catch (error) {
            console.error('Error calculating charge:', error);
            setCalculatingCharge(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="user-form-container">
            <h3 className='text-center py-4 mt-4 text-danger'>Fill up reservation details, customer information and additional charges to proceed further</h3>
            {/* Invoice link */}
            <div className="link-box text-center mb-3">
                {/* //passing data in query params */}
                <Link
                    className={`btn btn-success py-2 ${!isFormComplete() && 'disabled'}`}
                    to={`/invoice?selectedType=${selectedType}&selectedMake=${selectedMake}&duration=${duration}&hours=${hours}&discount=${discount}&collisionDamage=${collisionDamage}&liabilityInsurance=${liabilityInsurance}&rentalTax=${rentalTax}&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&totalCharge=${totalCharge}`}
                    disabled={!isFormComplete()}
                >
                    Invoice details
                </Link>
            </div>
            <div className="user-info d-flex justify-content-around">
                {/* Reservation Details */}

                <div className="section  border border-2 border-success p-4">
                    <h1>Reservation Details</h1>
                    <div className="form-column">
                        <form>
                            <label>Reservation id:</label>
                            <input type="text" placeholder="Input id here..." /><br></br>
                            <label>Pickup date:</label>
                            <input type="date" placeholder="Input pickup date here..." min={today} onChange={(e) => setPickupDate(e.target.value)} /><br></br>
                            <label>Return date:</label>
                            <input type="date" placeholder="Input return date here..." min={today} onChange={(e) => setReturnDate(e.target.value)} /><br></br>
                            <label>Extra hours:</label>
                            <input type="number" placeholder="in hours..." max={24} onChange={(e) => setHours(e.target.value)} /><br></br>
                            <label>Discount:</label>
                            <input type="number" placeholder="Discount if any..." max={100} onChange={(e) => setDiscount(e.target.value)} />
                        </form>
                    </div>
                </div>
                {/* Customer Information */}
                <div className="section border border-2 border-success p-4">
                    <h1>Customer Information</h1>
                    <div className="form-column">
                        <form>
                            <label>First Name:</label>
                            <input type="text" placeholder="First name here..." onChange={(e) => setFirstName(e.target.value)} /><br></br>
                            <label>Last Name:</label>
                            <input type="text" placeholder="Last name here..." onChange={(e) => setLastName(e.target.value)} /><br></br>
                            <label>Email:</label>
                            <input type="email" placeholder="Email here..." onChange={(e) => setEmail(e.target.value)} /><br></br>
                            <label>Phone:</label>
                            <input type="tel" placeholder="Phone number here..." onChange={(e) => setPhone(e.target.value)} /><br></br>
                        </form>
                    </div>
                </div>
                {/* Additional charges */}
                <div className="section border border-2 border-success p-4">
                    <h1>Additional charges</h1>
                    <div className="form-column">
                        <label>
                            <input type="checkbox" onChange={(e) => setCollisionDamage(e.target.checked)} />
                            Collision Damage 9.00$
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" onChange={(e) => setLiabilityInsurance(e.target.checked)} />
                            Liability Insurance 15.00$
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" onChange={(e) => setRentalTax(e.target.checked)} />
                            Rental Tax 11.5%
                        </label>
                    </div>
                </div>
            </div>
            <hr className='border border-3 border-success'></hr>
            {/* Booking information and Additional charges */}
            <div className="booking-info d-flex justify-content-around ">
                {/* Booking information */}
                <div className='border border-2 border-success p-5'>
                    <h1>Booking information</h1>
                    <form >
                        <p>Selected Type: {selectedType}</p>
                        <p>Selected Make: {selectedMake}</p>
                        {duration !== '' && <p>Duration (in days): {duration}</p>}
                        {hours !== '' && <p>Extra hours : {hours}</p>}
                        {discount !== '' && <p>Discount: {discount}%</p>}


                    </form>
                </div>
                {/* Selected additional charges */}
                <div className='border border-2 border-success p-4'>
                    <h2 className='py-3 text-primary'>Selected additional charges</h2>
                    {collisionDamage && <p className='fs-5'>Collision Damage 9.00$</p>}
                    {liabilityInsurance && <p className='fs-5'>Liability Insurance 15.00$</p>}
                    {rentalTax && <p className='fs-5'>Rental Tax 11.5%</p>}
                </div>
            </div>
            <div className="text-center mt-4">
                <button type="submit" disabled={calculatingCharge || !isFormComplete()} onClick={handleSubmit} className="btn btn-primary">
                    {calculatingCharge ? 'Calculating...' : 'Calculate Charge'}
                </button>
            </div>
            {/* Total Charge */}
            {totalCharge !== null && (
                <div className="total-charge text-center">
                    <h3 className='pt-4 text-primary'>It's going to cost you</h3>
                    <p className='fw-bold py-2'>{totalCharge} $</p>
                </div>
            )}

        </div>
    );
}

export default UserForm;
