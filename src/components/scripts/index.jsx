import { useEffect, useState } from "react";
import Modal from "./modal";

const Content = (props) => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalMode, setModalMode] = useState();

  useEffect(async () => {
    setData(await getScripts());
  }, [])


  const getScripts = async () => {
    let response = await fetch(`/api/scripts`);
    let data = await response.json();
    return data.message;
  }
  const handleModal = (data, mode) => {
    setShowModal(true);
    setModalMode(mode)
    setModalData(data);
  }

  const closeModal = () => {
    setShowModal(false);
    setModalMode()
    setModalData({});
  }

  const handleChangeOfText = (event) => {
    const { name, value } = event.target;
    setModalData({...modalData, [name]: value});
  }
  
  const handleChangeOfSelect = (event, option) => {
    const { name } = event.target;
    setModalData({...modalData, [name]: option});
  }

  const handleToogle = (name, value) => {
    setModalData({...modalData, [name]: value});
  }

  const handleModalSubmit = (scriptId, scriptDetails) => {
    if (modalMode === "update") {
      const index = data.findIndex((element) => element._id === scriptId);
      const updatedData = [
        ...data.slice(0, index),
        { ...scriptDetails },
        ...data.slice(index + 1),
      ];
      setData(updatedData);
      updateScriptinDb(scriptDetails)
    }
    if(modalMode === "add") {
      if(JSON.stringify(defaultObject) !== JSON.stringify(scriptDetails) ) {
        addScriptInDb(scriptDetails)
      }
    }
    closeModal();
  }

  const handleCloneWithChanges = async(scriptDetails) => {
    if (modalMode === "update") {
      delete scriptDetails._id;
      await addScriptInDb(scriptDetails);
      setData(await getScripts());
    }
    closeModal();
  }

  const handleDeleteScript = async(scriptDetails) => {
    if (modalMode === "update") {
      await deleteScriptInDb(scriptDetails);
      setData(await getScripts());
    }
    closeModal();
  }

  const updateScriptinDb = async (data) => {
    const putMethod = {
      method: 'PUT',
      headers: {
       'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data) 
     }
     await fetch("/api/scripts", putMethod)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(err => console.log(err))
  }

  const addScriptInDb = async (data) => {
    const postMethod = {
      method: 'POST',
      headers: {
       'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data) 
     }
     await fetch("/api/scripts", postMethod)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(err => console.log(err))
  }

  const deleteScriptInDb = async (data) => {
    const deleteMethod = {
      method: 'DELETE',
      headers: {
       'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data) 
     }
     await fetch("/api/scripts", deleteMethod)
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(err => console.log(err))
  }

  const defaultObject = {
    name: "",
    op_name: "",
    trade: false,
    quantity: 0,
    trailing_or_fix: false,
    fix_sl: 0,
    item_otm: 0,
    step_value: 0,
    time_frame: 1,
    entry_level: 0,
    target_level: 0,
    stop_level: 0,
    sell_level: 0,
    sell_target_level: 0,
    sell_stop_level: 0
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="py-8">
          <div className="flex flex-wrap flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 className="text-2xl leading-tight md:pr-0 text-white">{props.title}</h2>
            <div className="text-end">
              <form className="flex w-full space-x-3">
                {/* <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="name"
                  />
                </div>
                <a
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                >
                  Filter
                </a> */}
                <a
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  onClick={() => handleModal(Object.assign({},defaultObject), "add")}
                >
                  Add Script
                </a>
              </form>
            </div>
          </div>
          <div className="py-4">
            <div className="max-w-full overflow-x-auto shadow rounded-lg">
              <table className="w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-5 bg-white  border-b border-r border-gray-200 text-gray-800  text-left text-bold uppercase font-bold"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      op_name
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b  border-r border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      trade
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b  border-r border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      trade_type
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      type
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b  border-r border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      quantity
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      strategy
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      trailing_or_fix
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      trailing_percentage
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      fix_sl
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Target_ratio
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      expiry
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      item_otm
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      step_val
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      time_frame
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Exchange
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Entry_level
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Target_level
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Stop_level
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Sell_level
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Sell_Target_level
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-5 bg-white  border-b border-r  border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                    >
                      Sell_stop_level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.map((element) => <tr onDoubleClick={() => handleModal(element, "update")}>
                      <td className="px-4 py-3 border-b  border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.op_name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 text-center py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 bg-${element?.trade ? "green" : "red"}-200 opacity-50 rounded-full`}
                          />
                          <span className="relative">{`${element?.trade ? "Active" : "Inactive"}`}</span>
                        </span>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.trade_type?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.type?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.quantity}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.strategy?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.trailing_or_fix ? "True" : "False"}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.trailing_percentage?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center whitespace-no-wrap">{element?.fix_sl}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.target_ratio?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.expiry?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b  border-r border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.item_otm}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.step_value}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.time_frame}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.exchange?.name}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.entry_level}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.target_level}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.stop_level}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.sell_level}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900  text-center whitespace-no-wrap">{element?.sell_target_level}</p>
                      </td>
                      <td className="px-1 py-3 border-b border-r  border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 text-center  whitespace-no-wrap">{element?.sell_stop_level}</p>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} closeModal={closeModal} data={modalData} handleDeleteScript={handleDeleteScript} modalMode={modalMode} handleCloneWithChanges={handleCloneWithChanges} handleChangeOfSelect={handleChangeOfSelect} handleChangeOfText={handleChangeOfText} handleToogle={handleToogle} handleModalSubmit={handleModalSubmit} />
    </div>
  )
};



export default Content;