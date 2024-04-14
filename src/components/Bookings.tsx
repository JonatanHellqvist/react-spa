/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////||Kan användas vid ett senare tillfälle om man vill visa bokningar för t.ex Admin||/////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';

// interface timeIsBooked {
// 	id: string,
// 	name: string,
// 	email: string,
// 	package: string,
// 	date: string,
// 	slot: string
// }

// function Bookings() {

// 	const [isBooked,setIsBooked] = useState<timeIsBooked[]>([]);

// 	useEffect(() => {
// 		fetch("http://localhost:3000/bookedTimes")
// 			.then(res => res.json())
// 			.then(data => setIsBooked(data));
// 	})
// 	return (
// 		<>
// 		<div className="PageHeader">
// 			<h3>Bokade tider</h3>
// 		</div>
// 		<div className="ContentBox">
// 			Bokade Tider: 
// 			{isBooked.map((isBooked: timeIsBooked) => (
// 				<div>
// 				<div key={isBooked.id}> {isBooked.date} {isBooked.name} {isBooked.email} {isBooked.package} {isBooked.slot}
// 				<br/>
// 				</div>
// 				</div>
// 			))}
// 			</div>
		
// 		</>
// 	);
// }

// export default Bookings;