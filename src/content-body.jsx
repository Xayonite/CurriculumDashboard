import FileManager from "./pages/FileManager/file-manager"
import Dashboard from "./pages/Dashboard/dashboard"
import Compare from "./pages/Compare/compare"

function ContentBody({currentPage}){
    
    if(currentPage === 0)
    { // Goes to the Dashboard component
        return <Dashboard />
    }

    else if(currentPage === 1)
    { // Goes to the Compare component
        return <Compare />
    }
    else
    { // Goes to the FileManager component
        return <FileManager />
    }
}

export default ContentBody