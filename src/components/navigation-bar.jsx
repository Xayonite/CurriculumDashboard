import './navigation-bar.css'
import React, { useState } from 'react';

function NavigationBar({ currentPage, setCurrentPage, navOptions }){
    function loadNavigationButtons() {
        return navOptions.map((option, index) => (
        <button className="nav-button" 
        onClick={() => {
            setCurrentPage(index);
            console.log(`Navigated to: ${option}`);}}>
            {option}
        </button>
        ));
    }

    return(
        <div className='navigation'>
            <h1>Curriculum <br/> Mapping</h1>
            <hr />
            <div className='nav-buttons'>
                {loadNavigationButtons ()}
            </div>
        </div>
    )
}

export default NavigationBar;