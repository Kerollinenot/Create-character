import './Stat.css'

export default function Stat({ title, value, setValue, CountStatPoints, statName, changeCountStatPoints }) {
    const connections = document.querySelectorAll(`[data-stat="${statName}"]`)
    console.log(connections)
    const minusStatPoint = () => {
        if (value > 0) {
            setValue(value - 1);
            changeCountStatPoints('+');
        }
    }

    const plusStatPoint = () => {
        if (CountStatPoints > 0) {
            setValue(value + 1);
            changeCountStatPoints('-');
        }
    }

    const highlightСonnections = () => {
        connections.forEach((item) => {
            item.classList.add(statName)
        })
    }

    const silenseConnections = () => {
        connections.forEach((item) => {
            item.classList.remove(statName)
        })
    }

    return (
        <div
            data-stat={statName}
            className="stat-item"
            onMouseOver={highlightСonnections}
            onMouseLeave={silenseConnections}
        >
            {title}
            <div className='change-stat-point'>
                <input type="button" value="-" onClick={minusStatPoint} />
                <span> {value} </span>
                <input type="button" value="+" onClick={plusStatPoint} />
            </div>
        </div>
    )
}
