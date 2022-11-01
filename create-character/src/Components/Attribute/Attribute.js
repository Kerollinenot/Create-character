import './Attribute.css'

export default function Attribute({title, value}) {
    return (
        <div className="attribute">
            <span>{title}</span>
            <span>{value}</span>
        </div>
    )
}
