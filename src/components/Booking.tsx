import Calendar from "react-calendar";


function Booking() {
	return (
		<div>
			<h3>Bokning</h3>
			<Calendar onClickDay={console.log}/>
		</div>

		
	);
}

export default Booking;