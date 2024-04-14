import Calendar from "react-calendar";
import BookingForm from "./BookingForm";
import { useEffect, useState } from "react";
import React from 'react';


// interface Booking {
// 	id: number;
// 	booking: any; 
//   }

function Booking() {
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookings, setBookings] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookedSlots, setBookedSlots] = useState<{ [date: string]: string[] }>({});

    const handleBooking = (date: string, time: string) => {
        const selectedDateString = selectedDate?.toLocaleDateString();

        if (!selectedDateString) {
            console.error("selectedDateString is undefined");
            return;
        }

        if (bookedSlots[selectedDateString] && bookedSlots[selectedDateString].includes(time)) {
            alert("Den valda tiden är redan bokad för den här dagen.");
            return;
        }

        // Uppdatera endast om tiden inte redan är bokad
        setBookedSlots(prevBookedSlots => ({
            ...prevBookedSlots,
            [selectedDateString]: [...(prevBookedSlots[selectedDateString] || []), time]
        }));
    };

    const handleDayClick = (date: Date) => {
        setShowBookingForm(true);
        setSelectedDate(date);
    }

    const updateBookings = (newBookingString: string) => {
        setBookings(prevBookings => {
            const newBooking = JSON.parse(newBookingString);
            console.log("Callback in App", newBooking);
            return [...prevBookings, { id: prevBookings.length + 1, booking: newBooking }];
        });
    };

    return (
        <div>
            <h3>Bokning</h3>
            <Calendar onClickDay={handleDayClick} />
            
            {selectedDate && (
                <p>Du har valt datum: {selectedDate.toLocaleDateString()}</p>
            )}
            {showBookingForm && selectedDate && (
                <BookingForm updateBooking={updateBookings} selectedDate={selectedDate} bookedSlots={bookedSlots} />
            )}
            <h4>Bokningslista: </h4>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>
                        <strong>Date:</strong> {booking.booking.date}, <strong>Time:</strong> {booking.booking.bookedTime}, <strong>Package:</strong> {booking.booking.spaPackage}, <strong>Name:</strong> {booking.booking.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Booking;

// function Booking() {

// 	const [showBookingForm, setShowBookingForm] = useState(false);
// 	const [bookings, setBookings] = useState<any[]>([])
// 	const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State för att lagra det valda datumet
// 	const [bookedSlots, setBookedSlots] = useState<{ [date: string]: string[] }>({}); //för att kolla bokningar

// 	const handleBooking = (date: string, time: string) => {
		

// 		if (!selectedDate) {
// 			console.error("selectedDateString is undefined");
// 			return;
// 		}

// 		const selectedDateString = selectedDate?.toLocaleDateString();
//         // Kontrollera om tiden redan är bokad för den valda dagen
//         if (bookedSlots[selectedDateString] && bookedSlots[selectedDateString].includes(time)) {
//             alert("Den valda tiden är redan bokad för den här dagen.");
//             return;
//         }

//         // Om tiden inte redan är bokad, lägg till den i bokningslistan
//         setBookedSlots(prevBookedSlots => ({
//             ...prevBookedSlots,
//             [selectedDateString]: [...(prevBookedSlots[selectedDateString] || []), time]
//         }));

//         // Uppdatera bokningslistan eller skicka data till servern
//         // ...
//     };
    
// 	const handleDayClick = (date: Date) => {
// 		setShowBookingForm(true);
// 		setSelectedDate(date);
// 	  }

// 	//   const updateBookings = (newBookingString: string) => {
// 	// 	const newBooking = JSON.parse(newBookingString);
// 	// 	console.log("Callback in App", newBooking);
// 	// 	setBookings([...bookings, {id: bookings.length +1, booking: newBooking}]) //skapar en ny lista med en lista som existerade sen tidigare och lägger till ett nytt objekt
// 	//   }
// 	const updateBookings = (newBookingString: string) => {
// 		setBookings(prevBookings => {
// 			const newBooking = JSON.parse(newBookingString);
// 			console.log("Callback in App", newBooking);
// 			return [...prevBookings, { id: prevBookings.length + 1, booking: newBooking }];
// 		});
// 	};

// 	useEffect(() => {
// 		if (selectedDate) {
// 			handleBooking(selectedDate.toLocaleDateString(), '')
// 		}
// 	}, [selectedDate]);

// 	  console.log("showBookingForm:", showBookingForm);
// 	return (
// 		<div>
// 			<h3>Bokning</h3>
// 			<Calendar onClickDay={handleDayClick}/>
			
// 			{selectedDate && (
//                 <p>Du har valt datum: {selectedDate.toLocaleDateString()}</p> // Visa det valda datumet
//             )}
// 			{showBookingForm && selectedDate && <BookingForm updateBooking={updateBookings} selectedDate={selectedDate} bookedSlots={bookedSlots}/>}
// 			<h4>Bokningslista: </h4>
// 			<ul>
//                 {bookings.map((booking, index) => (
//                     <li key={index}>
//                         <strong>Date:</strong> {booking.booking.date}, <strong>Time:</strong> {booking.booking.bookedTime}, <strong>Package:</strong> {booking.booking.spaPackage}, <strong>Name:</strong> {booking.booking.name}
//                     </li>
//                 ))}
//             </ul>
// 		</div>

		
// 	);
// }

// export default Booking;