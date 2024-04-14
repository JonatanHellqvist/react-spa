// import React, { useState } from 'react';

// function PackageSelection(props: { onSelectPackage: (packageType: string) => void }) {
// 	// const [selectedPackage, setSelectedPackage] = useState('');

// 	const handleSelectPackage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         props.onSelectPackage(event.target.value);
//     };

// 	return (
// 		<div>
// 		<label>
// 			<input
// 				type="radio"
// 				value="hot"
// 				onChange={handleSelectPackage}
// 			/>
// 			Hot Package
// 		</label>
// 		<label>
// 			<input
// 				type="radio"
// 				value="cold"
// 				onChange={handleSelectPackage}
// 			/>
// 			Cold Package
// 		</label>
// 	</div>
// 	);
// }

// export default PackageSelection;