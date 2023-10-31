import React, { useEffect, useState } from "react";
import "./App.css";

//Function to display main option component
function MainOption({ disabled, id, options, onClick }) {
  return (
    <div onClick={onClick}>
      <span className="input-flex" tabIndex="0">
        <span className="fa fa-sliders"></span>
        <select id={id} disabled={disabled}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

//Function to display group or order option component
function SubOption({ disabled, id, options, selectStyle, label, onChange }) {
  return (
    <div>
      <div className="inputDiv">
        <label>{label}</label>
        <span className="input-flex" tabIndex="1" style={selectStyle}>
          <span className="fa fa-sliders"></span>
          <select id={id} disabled={disabled} onChange={onChange}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}

//Function to display the option popup
function OptionContainer({ onGroupChange, onOrderChange }) {
  
  const groups = [
    { value: 'status', label: 'Status' },
    { value: 'userId', label: 'User' },
    { value: 'priority', label: 'Priority' }
  ];

  const orders = [
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
  ];

  const selectStyle1 = {
    width: '100px',
  };
  const selectStyle2 = {
    width: '100px',
    marginTop: '10px',
  };

  return (
    <div className="optioncontainer">
      <SubOption id={"grouping"} label={"Grouping"} options={groups} selectStyle={selectStyle1} onChange={onGroupChange} />
      <SubOption id={"ordering"} label={"Ordering"} options={orders} selectStyle={selectStyle2} onChange={onOrderChange} />
    </div>
  );
}

//Function to render the cards with details
function RenderCard({ groupedData, data, selectedGroup }) {
  if (!groupedData) {
    return <p>Loading...</p>;
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  let backgroundColor = getRandomColor();

  const getStatusDetails = () => {
    return true;
  };

  const getUserName = (userId, userData) => {
    let username = userData.find((user) => user.id === userId);
    if (username) {
        const username1 = username.name;
        return username1;
    }
  };

  const getUserInit = (key, userData, selectedGroup) => { 
    let userid = ''
    let usernameMap = ''
    if (selectedGroup == 'status'){
      usernameMap = userData.tickets.find((item) => item.status == key);
    }else if (selectedGroup == 'priority'){
      usernameMap = userData.tickets.find((item) => item.priority == key);
    }else if (selectedGroup == 'userId'){
      usernameMap = userData.tickets.find((item) => item.userId == key);
    }
    
    // console.log(userData.tickets)
    if (usernameMap) {
      userid = usernameMap.userId
    }

    if (userid != '') {
        let username = userData.users.find((user) => user.id === userid);
        const username1 = username.name;
        const imgdata = username1.substring(0, 2).toUpperCase();
        return imgdata;
    }
    
  };

  const getStateIcon = (key) => {
    let icon = ''
    if (key == 'Backlog'){
      icon = '  fa fa-bug'
    }else if (key == 'Todo') {
      icon = 'fa  fa fa-circle-o'
    }else if (key == 'In progress') {
      icon = ' fa fa-clock-o'
    }else if (key == 'Done') {
      icon = ' fa fa-check-circle'
    }else if (key == 'Canceled') {
      icon = ' fa fa-times-circle'
    }
    return icon;
  };

  const getStateColor = (key) => {
    let color = {
      color:"gray"
    }
    if (key == 'Backlog'){
      color = {
        color:"red",
      }
    }else if (key == 'Todo') {
      color = {
        color:"gray",
      }
    }else if (key == 'In progress') {
      color = {
        color:"orange",
      }
    }else if (key == 'Done') {
      color = {
        color:"blue",
      }
    }else if (key == 'Canceled') {
      color = {
        color:"green",
      }
    }
    return color;
  };

  const getPriorityName = (key) => {
    let name = ''
    if (key == 0){
      name = 'No Priority'
    }else if (key == 1) {
      name = 'Low'
    }else if (key == 2) {
      name = 'Medium'
    }else if (key == 3) {
      name = 'High'
    }else if (key == 4) {
      name = 'Urgent'
    }
    return name;
  };

  const getPriorityIcon = (key) => {
    let icon = ''
    if (key == 0){
      icon = ' fa fa-ellipsis-h'
    }else if (key == 1) {
      icon = '  fa fa-battery-1'
    }else if (key == 2) {
      icon = '  fa fa-battery-2'
    }else if (key == 3) {
      icon = ' fa fa-battery-3'
    }else if (key == 4) {
      icon = ' fa fa-exclamation-circle'
    }
    return icon;
  };

  const getPriorityColor = (key) => {
    let color = ''
    if (key == 4){
      color = {
        color:"red",
      }
    }else{
      color = {
        color:"gray",
      }
    }
    return color;
  };


  return (
    <div className="card-container">
      {Object.keys(groupedData).map((key) => (
        <div key={key}>
          <div className="counterBox">
            <div className="cardCountInfo">
           
            {selectedGroup == 'userId' ? (
               <>
               
                <div className="Counticon" style={{ backgroundColor: getRandomColor() }}>{getUserInit(key, data, selectedGroup)}</div>
                <p className="groupTitle">{getUserName(key, data.users)}</p>
                <p className="groupTitle">{groupedData[key].length}</p>
                </>
              ) : selectedGroup == 'status' ? (
                <>
                  <div className={getStateIcon(key)} style={getStateColor(key)}></div>
                  <p className="groupTitle">{key}</p>
                  <p className="groupTitle">{groupedData[key].length}</p>
                </>
              ) : selectedGroup == 'priority' ? (
                <>
                  <div className={getPriorityIcon(key)} style={getPriorityColor(key)}></div>
                  <p className="groupTitle">{getPriorityName(key)}</p>
                  <p className="groupTitle">{groupedData[key].length}</p>
                </>
              ) : (
                <div className="removeButton fa fa-ellipsis-h"></div>
              )}

              
            </div>
            <div className="manageButtons">
              <div className="addButton fa fa-plus"></div>
              <div className="removeButton fa fa-ellipsis-h"></div>
            </div>
          </div>
              
          {groupedData[key]?.length > 0 && (
            <>
           
              {groupedData[key].map((item) => (
                <div key={item.id} className="card">
                  <div className='cardInfo'>
                    <p className='cardTitle'>{item.id}</p>
                    <div className='userProfile' style={{ backgroundColor: getRandomColor() }}>{getUserInit(key, data, selectedGroup)}</div>
                  </div>
                  <p className='cardContent'>{item.title}</p>
                  <div className='cardInfo1'>
                    <span className="infoEllipsis fa fa-ellipsis-h"></span>
                    <div className='cardInfo1 border'>
                      <div className='featureRequestDot'></div>
                      <p className='featureRequestText'>Feature Request</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

//Function to group the data by key
function groupDataByKey(data, key) {
  data = data['tickets'];
  return data.reduce((groups, item) => {
    const keyValue = item[key];
    groups[keyValue] = groups[keyValue] || [];
    groups[keyValue].push(item);
    return groups;
  }, {});
}

function orderDataByKey(data, key){
   for (const val in data) {
    if (data.hasOwnProperty(val)) {
      data[val].sort((taskA, taskB) => {
        if (typeof taskA[key] === 'string') {
          return taskA[key].localeCompare(taskB[key]);
        } else if (typeof taskA[key] === 'number') {
          return taskA[key] - taskB[key];
        } else {
          return 0; 
        }
      });
    }
  }
  return data;
}

//Function to ensure all the status covered
function ensureAllStatus(groupedData){
  if (!groupedData['Todo']){
    groupedData['Todo'] = [];
  }
  if(!groupedData['In progress']){
    groupedData['In progress'] = [];
  }
  if(!groupedData['Done']){
    groupedData['Done'] = [];
  }
  if(!groupedData['Canceled']){
    groupedData['Canceled'] = [];
  }
  if(!groupedData['Backlog']){
    groupedData['Backlog'] = [];
  }
  const order = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  const rearrangedData = {};
  order.forEach(status => {
      rearrangedData[status] = groupedData[status] || [];
  });
  return rearrangedData;
}

function App() {
  const disp = [
    { value: 'Display', label: 'Display' },
  ];

  const [optionContainerVisible, setOptionContainerVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('status'); 
  const [selectedOrder, setSelectedOrder] = useState('priority');
  const [groupedData, setGroupedData] = useState(null);
  const [data, setData] = useState(null);


  const toggleOptionContainer = () => {
    setOptionContainerVisible((prevVisible) => !prevVisible);
  };

  const handleGroupChange = (e) => {
    const newSelectedGroup = e.target.value;
    setSelectedGroup(newSelectedGroup);
    fetchDataFromExternalAPI(newSelectedGroup, selectedOrder);
  };

  const handleOrderChange = (e) => {
    const newSelectedOrder = e.target.value;
    setSelectedOrder(newSelectedOrder);
    fetchDataFromExternalAPI(selectedGroup, newSelectedOrder);
  };

  const fetchDataFromExternalAPI = async (selectedGroup, selectedOrder) => {

    try {
      const apiUrl = `https://api.quicksell.co/v1/internal/frontend-assignment`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      let newGroupedData = groupDataByKey(data, selectedGroup);
      if (selectedGroup == 'status'){
        newGroupedData = ensureAllStatus(newGroupedData);
      }
      newGroupedData = orderDataByKey(newGroupedData, selectedOrder)
      setGroupedData(newGroupedData, data);
      setData(data);
    } catch (error) {
      console.error("Error fetching data from external API:", error);
    }
  };

  useEffect(() => {
    fetchDataFromExternalAPI(selectedGroup, selectedOrder);
  }, [selectedGroup, selectedOrder]); 

  return (
    <div>
      <header>
        <MainOption disabled={true} id={"displayoptions"} options={disp} onClick={toggleOptionContainer} />
        {optionContainerVisible && <OptionContainer onGroupChange={handleGroupChange} onOrderChange={handleOrderChange} />}
      </header>
      <RenderCard groupedData={groupedData} data={data} selectedGroup = {selectedGroup} />
    </div>
  );
}

export default App;
