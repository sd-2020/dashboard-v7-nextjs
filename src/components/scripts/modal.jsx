import { useEffect, useState } from "react";
import Select from "../input-components/Select";
import Text from "../input-components/Text";
import Toggle from "../input-components/Toggle";

function Modal({ showModal, closeModal, handleDeleteScript, modalMode, handleCloneWithChanges, data, handleChangeOfSelect, handleChangeOfText, handleToogle, handleModalSubmit }) {
  const [scriptsDomain, setScriptsDomain] = useState({});

  useEffect(async () => {
    if (showModal === true) {
      let response = await fetch(`/api/scripts-domain`);
      let responseData = await response.json();
      console.log("==>>>", responseData.message)
      setScriptsDomain(responseData.message);
    }
  }, [showModal])

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {data?.op_name}
                  </h3>
                  {modalMode === "update" ? <div className="flex items-start justify-between">
                    <div className="flex flex-shrink-0 cursor-pointer px-1 py-1 text-base font-semibold text-gray mr-3 bg-green-200 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-100" onClick={() => handleCloneWithChanges(data)}>
                      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg> <span className="p-1">Clone with changes</span>
                    </div>
                    <div className="flex flex-shrink-0 px-1 py-1 cursor-pointer text-base font-semibold text-gray bg-gray-200 rounded-lg shadow-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-200" onClick={() => handleDeleteScript(data)}>
                      <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div> : null}

                  {/* <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => closeModal()}
                    >
                      <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                      </span>
                    </button> */}
                </div>
                {/*body*/}
                <div className="relative p-12 flex-auto">
                  <div className="w-full">
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <Text label={"Name"} value={data?.name} handleChangeOfText={handleChangeOfText} name={"name"} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <Text label={"OP Name"} value={data?.op_name} name={"op_name"} handleChangeOfText={handleChangeOfText} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Toggle label={"Trade"} value={data.trade} option={["Active", "Inactive"]} name={"trade"} handleToogle={handleToogle} />
                        </div>
                        <div className="w-full md:w-3/4 px-3">
                          <Select label={"Strategy"} value={data.strategy} name={"strategy"} options={scriptsDomain.strategies} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <Text label={"Quantity"} value={data?.quantity} name={"quantity"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                          <Select label={"Type"} value={data?.type} name={"type"} options={scriptsDomain.types} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                          <Select label={"Trade Type"} value={data?.trade_type} name={"trade_type"} options={scriptsDomain.tradeTypes} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/4 px-3">
                          <Toggle label={"Trailing or Fix"} value={data?.trailing_or_fix} option={["True", "False"]} name={"trailing_or_fix"} handleToogle={handleToogle} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Select label={"Trailing %"} value={data?.trailing_percentage} name={"trailing_percentage"} options={scriptsDomain.trailingPercentages} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Fix SL"} value={data?.fix_sl} name={"fix_sl"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Select label={"Target Ratio"} value={data?.target_ratio} name={"target_ratio"} options={scriptsDomain.targetRatios} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Select label={"Expiry"} value={data?.expiry} name={"expiry"} options={scriptsDomain.expiries} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Timeframe"} value={data?.time_frame} name={"time_frame"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Item OTM"} value={data?.item_otm} name={"item_otm"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Step Value"} value={data?.step_value} name={"step_value"} handleChangeOfText={handleChangeOfText} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">
                          <Select label={"Exchange"} value={data?.exchange} name={"exchange"} options={scriptsDomain.exchanges} handleChangeOfSelect={handleChangeOfSelect} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Entry Level"} value={data?.entry_level} name={"entry_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Target Level"} value={data?.target_level} name={"target_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Stop Level"} value={data?.stop_level} name={"stop_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Sell Level"} value={data?.sell_level} name={"sell_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Sell Target"} value={data?.sell_target_level} name={"sell_target_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                          <Text label={"Sell Stop"} value={data?.sell_stop_level} name={"sell_stop_level"} handleChangeOfText={handleChangeOfText} />
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* {JSON.stringify(data)} */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleModalSubmit(data?._id, data)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;