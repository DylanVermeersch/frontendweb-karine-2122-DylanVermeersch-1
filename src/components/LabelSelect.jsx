import { useFormContext } from "react-hook-form";

const LabelSelect = ({ label, options, validation, ...rest}) => {
    const {register, formState: { errors } } = useFormContext();
    return (
        <div className="lblSelect"> 
            <label htmlFor={label}>{label}</label>
            <select 
                {...register(label, validation)}
                {...rest}
                id={label}
                name={label}>
                <option value="">--choose a {label}--</option>
                {options.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name}
                    </option> 
                ))}
            </select>
            {errors[label] && <p className="lblErrorText">{errors[label].message}</p>}
        </div>
    );
};

export default LabelSelect;