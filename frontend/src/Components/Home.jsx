import React, {useState} from 'react'
import filterIcon from '../Images/Tuning.svg';
import downarrowIcon from '../Images/Downarrow.svg';
import './Home.css'

export default function Home(props){
    const [togglefilter, setToggleFilter] = useState(false);

    function handleDisplay(e){
        setToggleFilter(!togglefilter);
        if(e.target.value !== undefined){
            props.handleGroupValue(e.target.value);
        }
    }
    function handleOrdering(e){
        setToggleFilter(!togglefilter);
        if(e.target.value !== undefined){
            props.handleOrderValue(e.target.value);
        }
    }
    
  return (
    <>
        <section className="sect">
            <div className="container">
                <div>
                    <div className="dispbtn" onClick={handleDisplay}>
                        <div className="dispicon dispfilter">
                            <img src={filterIcon} alt="icon" />
                        </div>
                        <div className="heading">
                            Display
                        </div>
                        <div className="dispicon drop">
                            <img src={downarrowIcon} alt="icon" />
                        </div>
                    </div>
                    <div className={togglefilter ? "dropdown dropdown-show" : "dropdown"}>
                        <div className="filters">
                            <div className="category">
                                Grouping
                            </div>
                            <div className="dropdown-selector">
                                <select value={props.groupValue} onChange={handleDisplay} className='selector' name="grouping" id="">
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>
                            </div>
                        </div>
                        <div className="filters">
                            <div className="category">
                                Ordering
                            </div>
                            <div className="dropdown-selector">
                                <select value={props.orderValue} onChange={handleOrdering} className='selector' name="ordering" id="">
                                    <option value="priority">Priority</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
