import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultvalue, validation, ...rest }) => {
    const {register, formState: { errors } } = useFormContext();
    return (
        <div className="lblInput">
            <label htmlFor={label}>{label}</label>
            <input 
                {...register(label, validation)}
                defaultValue={defaultvalue}
                placeholder={label}
                type={type}
                id={label}
                name={label}
                {...rest} 
            />
            {errors[label] && (
                <p data-cy="labelinput-error" className="lblErrorText">
                    { errors[label].message }
                </p>
            )}
        </div>
    );
};

export default LabelInput;