import FileManager from "./content-body components/file-manager"
import Dashboard from "./content-body components/dashboard"
import Compare from "./content-body components/compare"

function ContentBody({currentPage}){
    
    if(currentPage === 0){ // Goes to the Dashboard component
        return <Dashboard />
    }

    else if(currentPage === 1){ // Goes to the Compare component
        return <Compare />
    }
    else{ // Goes to the FileManager component
        return <FileManager />
    }
}

export default ContentBody