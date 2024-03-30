import "./User.css"
const CarCards = ({ vehicles }) => {
    return (
        //cars are being rendered in  bootstrap card
        <div className="card-container">
            {vehicles.map(vehicle => (
                <div className="card border-2" key={vehicle.id} style={{ width: '18rem' }}>
                    <img className="card-img-top" src={vehicle.imageURL} alt={`${vehicle.make} ${vehicle.model}`} />
                    <div className="card-body">
                        <h5 className="card-title fs-3 text-center">{vehicle.make} {vehicle.model}</h5>
                        <p className="card-text"><b>Year:</b> {vehicle.year}</p>
                        <p className="card-text"><b>Type:</b> {vehicle.type}</p>
                        <p className="card-text"><b>Seats:</b> {vehicle.seats}</p>
                        <p className="card-text"><b>Bags: </b>{vehicle.bags}</p>
                        <p className="card-text"><b>Features:</b> {vehicle.features.join(', ')}</p>
                        <p className="card-text"><b>Hourly Rate:</b> {vehicle.rates.hourly}</p>
                        <p className="card-text"><b>Daily Rate:</b> {vehicle.rates.daily}</p>
                        <p className="card-text"><b>Weekly Rate:</b> {vehicle.rates.weekly}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CarCards;