import './styles/PageHeader.css'

function Info() {
	return (
		<>
		<div className="PageHeader">
			<div id="PackageInfo">
			<h4>Nedan visas de paket som vi för tillfället har tillgängliga för bokning</h4>
			<p>Har du hittat något paket du är intresserad av? Gå vidare till bokning för att hitta en ledig tid som passar dig och din katt.</p>
			</div>
		</div>
		<div className="ContentBox">
			<div id="PackageCards">
<div id="HotPackage" className="PackageCard">
	<h1>HOT - "Purr-fect Pampering"</h1>
	
	<p>Din katt blir inbäddad i en lyxig, uppvärmd kattfilt och smeksamt masserad med varma, lugnande stenar. Medan den mjuka värmen tränger in i dess päls och muskler, slappnar din katt av fullständigt och låter sig bli ompysslad till sin innersta kärna.
	</p>
	<h2>Pris: 666kr</h2>
</div>
<div id="ColdPackage" className="PackageCard">
	<h1>COLD - "Cool Cat Chill-out"</h1>
	
	<p>Din katt får njuta av en uppfriskande behandling med svalkande ispackar och kylande gel. Denna svala session lindrar trötta muskler och ger en känsla av uppfriskning och välbefinnande. Medan isen lugnt sveper över pälsen, känner din katt sig som en sval och avslappnad kung eller drottning av katterna.
	</p>
	<h2>Pris: 666kr</h2>
</div>
</div>
		</div>
		</>
	);
}

export default Info;