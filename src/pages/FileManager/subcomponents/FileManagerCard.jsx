import '../file-manager.css'
import triangleDown from '../../../assets/triangle-down.svg';

function FileManageCard({title, index}){
    const bgColor = index % 2 === 0 ? '#D9D9D9' : '#FFFFFF';
    const borderColor = index % 2 === 0 ? '#D9D9D9' : '#FFFFFF';
    
    return (
        <div className='manage-file-card' style={{ backgroundColor: bgColor, borderColor: borderColor }}>
            <h4 className='manage-file-card-title'> {title} </h4>
            <img src={triangleDown} alt="Triangle down" width={24} height={24} />
        </div>
    )
}

export default FileManageCard