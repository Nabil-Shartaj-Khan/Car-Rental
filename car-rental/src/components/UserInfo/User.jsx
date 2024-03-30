import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { Link } from 'react-router-dom';
import CarCards from './CarCards';

const User = () => {

    //necessary states for the app to run
    const [vehicles, setVehicles] = useState([]); //for fetching cars from backend
    const [vehicleTypes, setVehicleTypes] = useState([]);  //for finding out vehicle type
    const [vehicleMake, setVehicleMake] = useState([]); //for finding out vehicle make
    const [selectedType, setSelectedType] = useState(''); //for selecting vehicle type in dropdown
    const [selectedMake, setSelectedMake] = useState(''); //for selecting vehicle make in dropdown
    const [isFormValid, setIsFormValid] = useState(false); //to check whether values are selected
    const [loading, setLoading] = useState(true); // to handle loading state


    //fetching car details from backend whenever the component is mounting
    useEffect(() => {
        axios.get('http://localhost:5000/cars')
            .then(response => {
                setVehicles(response.data);
                console.log('Fetched vehicle data:', response.data);

                // Extracting vehicle types from vehicles data
                const types = [...new Set(response.data.map(vehicle => vehicle.type))];
                setVehicleTypes(types);
                setLoading(false); // update loading state after data is fetched
            })
            .catch(error => {
                console.error('Error fetching vehicle data:', error);
                setLoading(false); // update loading state even if there's an error
            });
    }, []);

    // Vehicles will be filtered based on their types
    useEffect(() => {
        if (selectedType) {
            const filteredVehicles = vehicles.filter(vehicle => vehicle.type === selectedType);
            setVehicleMake([...new Set(filteredVehicles.map(vehicle => vehicle.make))]);
        }
    }, [selectedType, vehicles]);

    //this is to check if both dropdowns are selected!
    useEffect(() => {
        setIsFormValid(selectedType !== '' && selectedMake !== '');
    }, [selectedType, selectedMake]);


    //for vehicle type
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setSelectedMake('');
    };
    //for vehicle make
    const handleMakeChange = (event) => {
        setSelectedMake(event.target.value);
    };

    return (
        <div className='text-center'>
            <div className="car-details">
                <div className="vehicle-information">
                    <h1 className='display-4 text-primary text-center py-4 fw-bold'>Select your ride and embark on the journey of a lifetime!</h1>
                    {/* fetched cars will be rendered conditionally */}
                    {loading ? (
                        <p className='fs-3 fw-bold'>Loading cars...Please wait</p>
                    ) : (
                        <CarCards vehicles={vehicles} />
                    )}

                    <div >

                        <form className='text-center pt-4 '>
                            <label className='fs-4'>Vehicle Type:</label>
                            <select className='fs-4' value={selectedType} onChange={handleTypeChange} required>
                                <option value="">Select Type</option>
                                {vehicleTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <br></br>
                            {selectedType && (
                                <>
                                    <label className='py-3 fs-4'>Vehicle Make:</label>
                                    <select className='fs-4' value={selectedMake} onChange={handleMakeChange} required>
                                        <option value="">Select Make</option>
                                        {vehicleMake.map(make => (
                                            <option key={make} value={make}>{make}</option>
                                        ))}
                                    </select>
                                    <br></br>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            {/* book button will only be visible when both vehicle make and types are selected and it will be passed to another component*/}
            {isFormValid ? (
                <div className='mb-5 mt-1'>
                    <Link className="btn btn-success px-4 py-3" to={`/form?type=${selectedType}&make=${selectedMake}`}>Book!</Link>
                </div>
            ) : (
                <p className='text-center pt-3 fw-semibold fs-5 text-danger'>Please first select vehicle type and vehicle make from the dropdown</p>
            )}
        </div>
    );
}

export default User;
