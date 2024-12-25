import "../../Components/AddProduct/inputStyles.css";

const CommonInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  multiline = false,
  rows = 1,
  options = [], // New prop for select options
}) => {
  return (
    <div className="relative w-full mb-6 font-signika">
      <div className="input-group w-full">
        {type === "select" ? (
          <div className="relative">
            <select
              required
              name={name}
              value={value}
              onChange={onChange}
              className="w-full peer border border-solid border-bg-green rounded-lg bg-transparent p-4 pr-8 text-bg-green text-lg transition-all focus-visible:border-2 focus-visible:border-solid focus-visible:border-bg-green focus-visible:outline-none appearance-none font-signika"
            >
              <option value="" disabled hidden>
                {label}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-4 h-4 text-bg-green"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
            <label
              className={`absolute left-4 text-[16px] pointer-events-none transform translate-y-4 transition-all ${
                value ? "translate-y-[-50%] scale-75" : ""
              } peer-focus:translate-y-[-50%] peer-focus:scale-75 peer-valid:translate-y-[-50%] peer-valid:scale-75 px-1 text-bg-green bg-white font-signika`}
            >
              {label}
            </label>
          </div>
        ) : multiline ? (
          <textarea
            required
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full peer border border-solid border-bg-green rounded-lg bg-transparent p-4 text-bg-green text-lg transition-all focus-visible:border-2 focus-visible:border-solid focus-visible:border-bg-green focus-visible:outline-none font-signika"
          />
        ) : (
          <input
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full peer border border-solid border-bg-green rounded-lg bg-transparent p-4 text-bg-green text-lg transition-all focus-visible:border-2 focus-visible:border-solid focus-visible:border-bg-green focus-visible:outline-none ${
              type === "number" ? "appearance-none" : ""
            } font-signika`}
            style={
              type === "number"
                ? { MozAppearance: "textfield", WebkitAppearance: "none" }
                : {}
            }
          />
        )}
        {type != "select" && (
          <label className="absolute left-4 text-[16px] pointer-events-none transform translate-y-4 transition-all peer-focus:translate-y-[-50%] peer-focus:scale-75 peer-valid:translate-y-[-50%] peer-valid:scale-75 px-1 text-bg-green bg-white font-signika">
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default CommonInput;
