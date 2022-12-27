const Text = ({name, label, value, handleChangeOfText}) => {
    return (<>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            {label}
        </label>
        <input name={name} onChange={handleChangeOfText} className="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-300" id="grid-first-name" type="text" value={value} />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </>)
}
export default Text;