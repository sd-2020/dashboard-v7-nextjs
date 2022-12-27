import { useEffect, useState } from "react";

const Toggle = ({name, label, value, option, handleToogle }) => {
    const [toggle, setToggle] = useState(value);
    const toggleClass = " transform translate-x-8";
    useEffect(() => {
        if(toggle === true) { handleToogle(name, true); } 
        else { handleToogle(name, false); }
    }, [toggle])
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                {label}
            </label>
            <div
                className="md:w-30 md:h-7 w-30 h-6 mt-4 flex items-center bg-gray-200 rounded-full p-4 cursor-pointer"
                onClick={() => {
                    setToggle(!toggle);
                }}
            >
                {toggle ? <div className="md:w-6 md:h-6 h-5 w-5 px-1">{option[0]}</div> : null}
                {/* Switch */}
                <div className={
                    
                    `${toggle ? "bg-green-500" : "bg-orange-500"} md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out ${!toggle ? "" : toggleClass}`
                }
                ></div>
                {!toggle ? <div className="md:w-6 md:h-6 h-5 w-5 px-2">{option[1]}</div> : null}
            </div>
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </>)
}

export default Toggle;