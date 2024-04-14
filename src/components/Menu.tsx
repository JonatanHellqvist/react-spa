import './styles/Menu.css'


interface Props {
	setPage: (page: string) => void,
}

function Menu(props: Props) {
	return (
		<div id="MenuBtns">	
  <a href="#" className="MenuBtn" onClick={() => props.setPage("start")}>Hem</a>|

  <a href="#" className="MenuBtn" onClick={() => props.setPage("info")}>Våra Spapaket</a>|
  {/* <a href="#" className="MenuBtn" onClick={() => props.setPage("personel")}>Personal</a>| */}
  <a href="#" className="MenuBtn" onClick={() => props.setPage("booking")}>Boka tid</a>|
  {/* <a href="#" className="MenuBtn" onClick={() => props.setPage("bookings")}>Bokade tider</a>| */}
</div>
	);
}

export default Menu;




// <div id="MenuBtns">	
// 			<button className="MenuBtn" onClick={() => props.setPage("start")}>Hem</button>
// 			<button className="MenuBtn" onClick={() => props.setPage("info")}>Våra Spapaket</button>
// 			<button className="MenuBtn" onClick={() => props.setPage("personel")}>Personal</button>
// 			<button className="MenuBtn" onClick={() => props.setPage("booking")}>Boka tid</button>
// 			<button className="MenuBtn" onClick={() => props.setPage("bookings")}>Bokade tider</button>
// 		</div>