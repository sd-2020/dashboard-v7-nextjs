const Select = ({ name, label, value, options, handleChangeOfSelect }) => {
    const id = value?._id ? value?._id : "";
    return (<>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            {label}
        </label>
        <div className="relative">
            <select
                name={name}
                onChange={(event) => handleChangeOfSelect(event, options.find((element) => element._id === event.target.value))}
                className="block appearance-none w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 mb-3 rounded leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300"
                id="grid-state"
                defaultValue={""} 
                value={id} >
                <option value={""} disabled>Select...</option>
                {options?.map((element, index) => {
                    return (<option key={index} value={element._id}> {element?.name} </option>)
                })
                }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
        </div>
    </>)
}
export default Select;