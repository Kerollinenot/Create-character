import { useEffect, useState } from 'react';

import './Skill.css'

export default function Skill(
    {
        title,
        value,
        setValue,
        maxSkillLvl,
        mainStat,
        statName,
        CountSkillPoints,
        changeCountSkillPoints }
) {

    const connections = document.querySelectorAll(`[data-stat="${statName}"]`)

    const [Classez, SetClassez] = useState('skill-item')

    useEffect(() => {
        changeBgColor()
    }, [value])

    const changeBgColor = () => {
        switch (value) {
            case 0:
                SetClassez('skill-item');
                break
            case 1:
                SetClassez('skill-item beginner');
                break
            case 2:
                SetClassez('skill-item apprentice');
                break
            case 3:
                SetClassez('skill-item adept');
                break
            case 4:
                SetClassez('skill-item expert');
                break
            case 5:
                SetClassez('skill-item master');
                break
            default:
                SetClassez('skill-item');
                break
        }
    }

    const minusSkillPoint = () => {
        if (value > 0) {
            setValue(value - 1)
            changeCountSkillPoints('+');
        }
    }

    const plusSkillPoint = () => {
        if (CountSkillPoints > 0 && value < mainStat && value < maxSkillLvl) {
            setValue(value + 1);
            changeCountSkillPoints('-');
        }
    }

    const highlightСonnections = () => {
        connections.forEach((item) => {
            item.classList.toggle(statName)
        })
    }

    const silenseConnections = () => {
        connections.forEach((item) => {
            item.classList.remove(statName)
        })
    }

    return (
        <div
            className={Classez}
            data-stat={statName}
            onMouseOver={highlightСonnections}
            onMouseLeave={silenseConnections}>
            {title}
            <div className='change-skill-point'>
                <input type="button" value="-" onClick={minusSkillPoint} />
                <span> {value} </span>
                <input type="button" value="+" onClick={plusSkillPoint} />
            </div>
        </div>
    )
}
