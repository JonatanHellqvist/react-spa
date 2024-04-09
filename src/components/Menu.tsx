interface Props {
	setPage: (page: string) => void,
}

function Menu(props: Props) {
	return (
		<div>	
			<button onClick={() => props.setPage("start")}>Start</button>
			<button onClick={() => props.setPage("info")}>Info</button>
			<button onClick={() => props.setPage("personel")}>Personal</button>
			<button onClick={() => props.setPage("booking")}>Boka tid</button>
		</div>
	);
}

export default Menu;