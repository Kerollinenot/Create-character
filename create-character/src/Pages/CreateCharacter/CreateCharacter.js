import React, { useState, useEffect } from 'react'

import Stat from '../../Components/Stat/Stat'
import Attribute from '../../Components/Attribute/Attribute';
import Skill from '../../Components/Skill/Skill';
import Button from '../../Components/Button/Button';

import './CreateCharacter.css'

export default function CreateCharacter() {
	const FileSaver = require('file-saver');

	const defaultHealth = 3;
	const defaultEvasion = 10;

	const maxSkillLvl = 5;

	const [NameCharacter, setNameCharacter] = useState()

	const [CountStatPoints, setCountStatPoints] = useState(15)
	const [CountSkillPoints, setCountSkillPoints] = useState(10)

	const [MaxHealth, setMaxHealth] = useState(defaultHealth)
	const [CurrentHealth, setCurrentHealth] = useState(MaxHealth)

	const [Strength, setStrength] = useState(0);
	const [Agility, setAgility] = useState(0);
	const [Intelligence, setIntelligence] = useState(0);
	const [Charisma, setCharisma] = useState(0);

	const [AttackDmg, setAttackDmg] = useState(0);
	const [Stealth, setStealth] = useState(0);
	const [Archery, setArchery] = useState(0);
	const [Learnability, setLearnability] = useState(0);
	const [Survival, setSurvival] = useState(0);
	const [Medicine, setMedicine] = useState(0);
	const [Intimidation, setIntimidation] = useState(0);
	const [Insight, setInsight] = useState(0);
	const [Appearance, setAppearance] = useState(0);
	const [Manipulation, setManipulation] = useState(0);

	useEffect(() => {
		setMaxHealth(defaultHealth + Strength);
		setCurrentHealth(defaultHealth + Strength);
	}, [Strength])
	
	const changeCountStatPoints = (operand) => {
		if (operand === '-') { setCountStatPoints(CountStatPoints - 1) }
		else if (operand === '+') { setCountStatPoints(CountStatPoints + 1) }
	}

	const changeCountSkillPoints = (operand) => {
		if (operand === '-') { setCountSkillPoints(CountSkillPoints - 1) }
		else if (operand === '+') { setCountSkillPoints(CountSkillPoints + 1) }
	}

	const SaveCharacter = () => {
		const Character = {
			NameCharacter: NameCharacter,

			CountStatPoints: CountStatPoints,
			CountSkillPoints: CountSkillPoints,

			Strength: Strength,
			Agility: Agility,
			Intelligence: Intelligence,
			Charisma: Charisma,

			AttackDmg: AttackDmg,
			Stealth: Stealth,
			Archery: Archery,
			Learnability: Learnability,
			Survival: Survival,
			Medicine: Medicine,
			Intimidation: Intimidation,
			Insight: Insight,
			Appearance: Appearance,
			Manipulation: Manipulation,
		}

		const blob = new Blob([JSON.stringify(Character)], { type: "text/plain;charset=utf-8" });
		FileSaver.saveAs(blob, `${NameCharacter}.json`);
	}

	const LoadCharacter = (file) => {
		const reader = new FileReader();

		reader.readAsText(file);
		reader.onload = (e) => ChangeCharStats(JSON.parse(e.currentTarget.result));
	}

	const ChangeCharStats = (CharStats) => {
		setNameCharacter(CharStats.NameCharacter);

		setCountStatPoints(CharStats.CountStatPoints);
		setCountSkillPoints(CharStats.CountSkillPoints);

		setStrength(CharStats.Strength);
		setAgility(CharStats.Agility);
		setIntelligence(CharStats.Intelligence);
		setCharisma(CharStats.Charisma);

		setAttackDmg(CharStats.AttackDmg);
		setStealth(CharStats.Stealth);
		setArchery(CharStats.Archery);
		setLearnability(CharStats.Learnability);
		setSurvival(CharStats.Survival);
		setMedicine(CharStats.Medicine);
		setIntimidation(CharStats.Intimidation);
		setInsight(CharStats.Insight);
		setAppearance(CharStats.Appearance);
		setManipulation(CharStats.Manipulation);
	}

	return (
		<div className='wrapper'>
			<form className='create-character'>
				<div className='create-character__meta'>
					<div>
						Имя персонажа:
						<input
							className='input-name'
							placeholder='Имя персонажа'
							type="text"
							value={NameCharacter}
							onChange={(e) => setNameCharacter(e.target.value)} />
					</div>

					<div className='attributes'>
						<Attribute title={'Здоровье'} value={`${CurrentHealth}/${MaxHealth}`} />
						<Attribute title={'Уклонение'} value={defaultEvasion + Agility} />
						<Attribute title={'Энергия'} value={Agility + Intelligence} />
					</div>

					<Button onClick={(e) => {
						setCurrentHealth(CurrentHealth > 0
							? CurrentHealth - 1
							: CurrentHealth
						)
					}}
						color={'blue'}>
						Боньк
					</Button>
				</div>

				<div className='create-character__choose-attributes'>
					<div className='main-attributes'>
						<div>
							Количество очков характеристик:
							<span> {CountStatPoints} </span>
						</div>

						<Stat
							title='Сила'
							value={Strength}
							statName={'strength'}
							setValue={setStrength}
							CountStatPoints={CountStatPoints}
							changeCountStatPoints={changeCountStatPoints}
						/>

						<Stat
							title='Ловкость'
							value={Agility}
							statName={'agility'}
							setValue={setAgility}
							CountStatPoints={CountStatPoints}
							changeCountStatPoints={changeCountStatPoints}
						/>

						<Stat
							title='Интеллект'
							value={Intelligence}
							statName={'intelligence'}
							setValue={setIntelligence}
							CountStatPoints={CountStatPoints}
							changeCountStatPoints={changeCountStatPoints}
						/>

						<Stat
							title='Харизма'
							value={Charisma}
							statName={'charisma'}
							setValue={setCharisma}
							CountStatPoints={CountStatPoints}
							changeCountStatPoints={changeCountStatPoints}
						/>
					</div>

					<div className='skills'>
						<div>
							Количество очков способностей:
							<span> {CountSkillPoints} </span>
						</div>

						<Skill
							title='Атака'
							value={AttackDmg}
							setValue={setAttackDmg}
							maxSkillLvl={maxSkillLvl}
							mainStat={Strength}
							statName={'strength'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Стелс'
							value={Stealth}
							setValue={setStealth}
							maxSkillLvl={maxSkillLvl}
							mainStat={Agility}
							statName={'agility'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Стрельба из лука'
							value={Archery}
							setValue={setArchery}
							maxSkillLvl={maxSkillLvl}
							mainStat={Agility}
							statName={'agility'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Обучаемость'
							value={Learnability}
							setValue={setLearnability}
							maxSkillLvl={maxSkillLvl}
							mainStat={Intelligence}
							statName={'intelligence'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Выживание'
							value={Survival}
							setValue={setSurvival}
							maxSkillLvl={maxSkillLvl}
							mainStat={Intelligence}
							statName={'intelligence'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Медицина'
							value={Medicine}
							setValue={setMedicine}
							maxSkillLvl={maxSkillLvl}
							mainStat={Intelligence}
							statName={'intelligence'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Запугивание'
							value={Intimidation}
							setValue={setIntimidation}
							maxSkillLvl={maxSkillLvl}
							mainStat={Charisma}
							statName={'charisma'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Проницательность'
							value={Insight}
							setValue={setInsight}
							maxSkillLvl={maxSkillLvl}
							mainStat={Charisma}
							statName={'charisma'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Внешний вид'
							value={Appearance}
							setValue={setAppearance}
							maxSkillLvl={maxSkillLvl}
							mainStat={Charisma}
							statName={'charisma'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>

						<Skill
							title='Манипулирование'
							value={Manipulation}
							setValue={setManipulation}
							maxSkillLvl={maxSkillLvl}
							mainStat={Charisma}
							statName={'charisma'}
							CountSkillPoints={CountSkillPoints}
							changeCountSkillPoints={changeCountSkillPoints}
						/>
					</div>
				</div>

				<div className='footer'>
					<Button
						color="green"
						size="m"
						onClick={SaveCharacter}>
						Сохранить персонажа
					</Button>

					<Button
						color="blue"
						size="m"
						onClick={() => LoadCharacter(document.querySelector('#choose-file').files[0])}>
						Загрузить персонажа
					</Button>

					<input className='choose-file' type="file" id="choose-file" accept=".json" />
				</div>
			</form>
		</div>
	)
}
