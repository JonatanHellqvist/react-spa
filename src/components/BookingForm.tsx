import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

// interface DateType {
// 	justDate: Date | null
// 	bookingSlot: string | null
// }

interface BookingFormData {
	name: string;
	email: string;
	spaPackage: string;
	spaTime: string;
}
function BookingForm() {
	const [formData, setFormData] = useState<BookingFormData>({
		name: '',
		email: '',
		spaPackage: '',
		spaTime: ''
	});

	const setName = (value: string) => setFormData(prev => ({ ...prev, name: value }));
	const setEmail = (value: string) => setFormData(prev => ({ ...prev, email: value }));
	const setSpaPackage = (value: string) => setFormData(prev => ({ ...prev, spaPackage: value }));
	const setSpaTime = (value: string) => setFormData(prev => ({ ...prev, spaTime: value }));

	const [holidays, setHolidays] = useState<Date[]>([]);

	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [selectedTime, setSelectedTime] = useState<string>('');
	const [bookedTimes, setBookedTimes] = useState<{date:Date | null; slot:string | null; package:string |null}[]>([]);

	const [showBookingForm, setShowBookingForm] = useState(false);

useEffect(() => {
	fetchBookedTimes();
	fetchRedDays();
}, []);

const fetchBookedTimes = () => {
	fetch("http://localhost:3000/bookedTimes")
		.then(res => res.json())
		.then(data => {
			const updatedBookedTimes = data.map((booking: { date: string; slot: string; package: string}) => ({
                date: new Date(booking.date),
                slot: booking.slot,
				package: booking.package
            }));
			setBookedTimes(updatedBookedTimes);
		})
		.catch(error => console.error("Fel när bokningar hämtades:", error));
};

const fetchRedDays = () => {
	fetch('http://sholiday.faboul.se/dagar/v2.1/2024')
		.then(res => {
			return res.json();
		})
		.then(data => {
			const holidays = data.dagar
				.filter((day:any) => day.hasOwnProperty("helgdag"))
				.map((day:any) => new Date(day.datum));
			setHolidays(holidays);
			console.log(holidays);
		})
		.catch(error => console.error("Error fetching red days:", error));
};
//formhantering
const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	if(!selectedDate) {
		console.error("Inget datum är valt");
		return;
	}
	const selectedDateString = selectedDate.toLocaleDateString();
	console.log(formData);
	if (formData.name.trim() === '' || formData.email.trim() === '' || formData.spaPackage.trim() === '' || formData.spaTime.trim() === '') {
		alert('Fyll i alla fälten för att skapa en bokning');
		return;
	}
	fetch("http://localhost:3000/bookedTimes", {
		method: "POST",
		headers: {
			"content-type":"application/json"
		},
		body: JSON.stringify({date: selectedDateString, slot: formData.spaTime, package: formData.spaPackage, name: formData.name, email: formData.email, })
	})
	.then(() => {
		setFormData({
			name: '',
			email: '',
			spaPackage: '',
			spaTime: ''
		});
		setSelectedTime('');
			
		fetchBookedTimes();
	})
	.catch(error => {
		console.error("Fel när bokningen skulle hanteras", error);
		alert("Något gick fel, försöker igen");
		setFormData({
			name: '',
			email: '',
			spaPackage: '',
			spaTime: ''
		});
		setSelectedTime('');
	});	
};
	const handleDayClick = (date: Date) => {
		const selectedDateString = date.toLocaleDateString();
		if (selectedDate && bookedTimes) {
			const alreadyBooked = bookedTimes.some(slot => slot.date?.toLocaleDateString() === selectedDateString && slot.slot === formData.spaTime && slot.package === formData.spaPackage);
        if (alreadyBooked) {
            alert("Denna tid är inte tillgänglig för det valda datumet, Välj en annan tid!");
            return;
        }
    	}
        setShowBookingForm(true);
        setSelectedDate(date);
    }

	const handleTimeChange = (time: string) => {
		if (isSlotBooked(selectedDate!, time, formData.spaPackage)) {
			alert("Denna tid är inte tillgänglig för det valda datumet, Välj en annan tid!");

			setSelectedTime('');
			setSpaPackage('')
			
			return;
		} else {
			setSelectedTime(time);
		}

		setSelectedTime(time);
		setSpaTime(time);
	};
	
	const isDayDisabled = (date: Date) => {
        const selectedDateString = date.toLocaleDateString();

        const bookedSlots = bookedTimes.filter(slot => slot.date?.toLocaleDateString() === selectedDateString && slot.package && slot.slot);

		const bookedHotSlots = bookedSlots.filter(slot => slot.package === "Hot").length;
    	const bookedColdSlots = bookedSlots.filter(slot => slot.package === "Cold").length;

		//disabla dagen i calendern om alla 6 bokningar är gjorda för den dagen eller om det är helgdag eller måndag
        return (bookedHotSlots + bookedColdSlots) >= 6 || isHoliday(date) || isMonday(date);
    };

	const isHoliday = (date: Date) => {
        return holidays.some(holiday => date.toDateString() === holiday.toDateString());
    };

	const isMonday = (checkDate: Date) => {
        return checkDate.getDay() === 1; // 1 = måndag
    };

	const isPastDate = (dateToCheck: Date) => {
        const now = new Date();
        return dateToCheck < now;
    };

	const isSlotBooked = (date: Date, time: string, packageType: string) => {
		return bookedTimes.some(slot => 
			slot.date?.toLocaleDateString() === date.toLocaleDateString() && 
			slot.slot === time && 
			slot.package === packageType
		);
	};
		return (
			<>
			{/* <div className="PageHeader">
			<h3>Bokning</h3>
			</div> */}
			<div id="BookingPage">
				<div id="BookingBox">
			  		<div className="InfoBox">
					{selectedDate? (
					
					<h1 id="LedigaTider">Lediga tider för : {selectedDate?.toLocaleDateString()} :</h1>
					) : ( <h2>Klicka på en tid nedan och fyll i formuläret för att boka en tid</h2> )} 
					</div>
				<div className="ContentBox">
			</div>	  
        	{selectedDate ? (
            <div id="BookedTimes">
                <div id="BookedHotSlots" className="BookedSlots">
                    <h2>HOT - "Purr-fect Pampering"</h2>
                    <ul >
                        {["Förmiddag", "Eftermiddag", "Kväll"].map((time, index) => {
                            const bookedSlot = bookedTimes.find(slot => {
                                const slotDateString = slot.date ? slot.date.toLocaleDateString() : null;
                                return slotDateString === selectedDate.toLocaleDateString() && slot.slot === time && slot.package === 'Hot';
                            });
                            if (bookedSlot) {
                                return (
                                    <div className="SlotDiv" key={index}>
                                        <h3 id="BokadTid">{time} BOKAD</h3>
                                        {/* <p>Spa Package: {bookedSlot.package}</p> */}
                                    </div>
                                );
                            } else {
                                return <div  key={index}>
								<h3 className="SlotDiv" >{time}</h3>
								</div>;
                            }
                        })}
                    </ul>
                </div>
                <div id="BookedColdSlots" className="BookedSlots">
                    <h2>COLD - "Cool Cat Chill-out"</h2>
                    <ul>
                        {["Förmiddag", "Eftermiddag", "Kväll"].map((time, index) => {
                            const bookedSlot = bookedTimes.find(slot => {
                                const slotDateString = slot.date ? slot.date.toLocaleDateString() : null;
                                return slotDateString === selectedDate.toLocaleDateString() && slot.slot === time && slot.package === 'Cold';
                            });
                            if (bookedSlot) {
                                return (
                                    <div className="SlotDiv"  key={index}>
                                        <h3 id="BokadTid">{time} BOKAD</h3>
                                        {/* <p>Spa Package: {bookedSlot.package}</p> */}
                                    </div>
                                );
                            } else {
                                return <div className="SlotDiv"  key={index}><h3>{time}</h3></div>;
                            }
                        })}
                    </ul>
                </div>
            </div> //Bookedtimes
        ) : (
			<div id="CalendarBox">
            	<Calendar onClickDay={handleDayClick} 
				tileDisabled={({ date }) => isDayDisabled(date) || isPastDate(date)} />
			</div>
        )}

<div id="TimesAndFormBox">	
	<div id="TimesInfo">			
		<h2>"Förmiddag: 9:00-10:30"</h2>
		<h2>"Eftermiddag: 13:00-14:30"</h2>
		<h2>"Kväll: 18:00-19:30"</h2>
	</div>
	{showBookingForm && (
		<form id="BookingForm" onSubmit={handleSubmit}>
			<p>Fyll i formuläret för att boka en ledig tid:</p>
			<div>
				<label>
					Name:
				</label>
					<input type="text" 
					value={formData.name} 
					onChange={e => setName(e.target.value)} 
					/>
				
			</div>
			<div>
				<label>
					Email:
				</label>
					<input type="email" value={formData.email} onChange={e => setEmail(e.target.value)} />
				
			</div>
			<div>
				Välj paket:
				<label>
					<input 
						type="radio" 
						checked={formData.spaPackage === 'Hot'}
						onChange={() => {
							setSpaPackage("Hot"); 
							setSelectedTime('');
						}}
					/>
				Hot
				</label>

				<label>
					<input 
						type="radio" 
						checked={formData.spaPackage === 'Cold'}
						onChange={() => {
							setSpaPackage("Cold"); 
							setSelectedTime('');
						}}
					/>
				Cold
				</label>
			</div>

			<div>
				Välj tid:

				<select value={selectedTime} onChange={(e) => handleTimeChange(e.target.value)}>

					<option value="">...</option>
					<option value="Förmiddag">Förmiddag</option>
					<option value="Eftermiddag">Eftermiddag</option>
					<option value="Kväll">Kväll</option>

				</select>
			</div>
				<button type="submit">Submit</button>
					
		</form>
		 	 )}
		</div>
		</div>	
		</div>
		</>
	)};

export default BookingForm;



