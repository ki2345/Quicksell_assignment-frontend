import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import './App.css';
import Board from './Components/Board';
import Home from './Components/Home';

function App() {
  const statusList = ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled']
  const userList = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh']
  const priorityList = [{name:'No priority', priority: 0}, {name:'Low', priority: 1}, {name:'Medium', priority: 2}, {name:'High', priority: 3}, {name:'Urgent', priority: 4}]

  const [groupvalue, setGroupValue] = useState(getStateFromLocalStorage() || 'status')
  const [ordervalue, setOrderValue] = useState('title')
  const [ticketdetails, setTicketDetails] = useState([]);


  const orderDataByValue = useCallback(async (cardsArray) => {
    if (ordervalue === 'priority') {
      cardsArray.sort((a, b) => b.priority - a.priority);
    } else if (ordervalue === 'title') {
      cardsArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } 
        else if (titleA > titleB) {
          return 1;
        } 
        else {
          return 0;
        }
      });
    }
    await setTicketDetails(cardsArray);
  }, [ordervalue, setTicketDetails]);

  function saveStateToLocalStorage(state) {
    localStorage.setItem('groupvalue', JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem('groupvalue');
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null; 
  }

  useEffect(() => {
    saveStateToLocalStorage(groupvalue);
    async function fetchData() {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      await refactorData(response);
  
    }
    fetchData();
    async function refactorData(res){
      let ticketArray = []
        if(res.status  === 200){
          for(let i=0; i<res.data.tickets.length; i++){
            for(let j=0; j<res.data.users.length; j++){
              if(res.data.tickets[i].userId === res.data.users[j].id){
                let ticketJson = {...res.data.tickets[i], userObj: res.data.users[j]}
                ticketArray.push(ticketJson)
              }
            }
          }
        }
      await setTicketDetails(ticketArray)
      orderDataByValue(ticketArray)
    }
    
  }, [orderDataByValue, groupvalue])

  function handleGroupValue(value){
    setGroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value){
    setOrderValue(value);
    console.log(value);
  }
  
  return (
    <>
      <Home
        groupValue={groupvalue}
        orderValue={ordervalue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="details">
        <div className="details-list">
          {
            {
              'status' : <>
                {
                  statusList.map((listItem) => {
                    return(<Board
                      groupValue='status'
                      orderValue={ordervalue}
                      listTitle={listItem}
                      listIcon=''
                      statusList={statusList}
                      ticketDetails={ticketdetails}
                    />)
                  })
                }
              </>,
              'user' : <>
              {
                userList.map((listItem) => {
                  return(<Board
                    groupValue='user'
                    orderValue={ordervalue}
                    listTitle={listItem}
                    listIcon=''
                    userList={userList}
                    ticketDetails={ticketdetails}
                  />)
                })
              }
              </>,
              'priority' : <>
              {
                priorityList.map((listItem) => {
                  return(<Board
                    groupValue='priority'
                    orderValue={ordervalue}
                    listTitle={listItem.priority}
                    listIcon=''
                    priorityList={priorityList}
                    ticketDetails={ticketdetails}
                  />)
                })
              }
            </>
            }[groupvalue]
          }
        </div>
      </section>
    </>
  );
}

export default App;
