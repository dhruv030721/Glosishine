export function InputFunc({ type, css, id, name, placeholder, eventHandler }) {
    return (
        <div>
            <input type={!type ? "text" : `${type}`} className={css ? css : "flex h-10 w-full rounded-md border  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} id={id} name={name} placeholder={placeholder} onChange={eventHandler} />
        </div>
    );
}

export function TextArea({ css, id, name, placeholder, eventHandler }) {
    return (
        <div>
            <textarea id={id} name={name} placeholder={placeholder} className={css ? css : "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
            onChange={eventHandler} >
            </textarea>
        </div>
    );
}