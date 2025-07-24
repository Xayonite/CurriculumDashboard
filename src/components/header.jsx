import './header.css'

function Header({ currentPage }){
    // Header choices placeholder
    const headerOptions = ["Curriculum Mapping Dashboard", "Curriculum Mapping Comparison", "Manage Files"];

    return(
        <div className="header-text">
            <h1>{headerOptions[currentPage]}</h1>
            <hr />
        </div>
    )
}

export default Header;