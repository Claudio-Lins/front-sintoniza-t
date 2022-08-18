interface AuthInputProps {
    label: string;
    value: any;
    required?: boolean;
    disabled?: boolean;
    type?: 'text' | 'password' | 'email';
    changeValue: (changeValue: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4">
        <label>{props.label}</label>
        <input
            type={props.type ?? 'text'}
            value={props.value}
            onChange={e => props.changeValue?.(e.target.value)}
            required={props.required}
            className={`
                px-4 py-2 rounded-lg border border-slate-200 bg-slate-100
                focus:border-slate-500 focus:bg-slate-50
            `}
        />
    </div>
  );
}
