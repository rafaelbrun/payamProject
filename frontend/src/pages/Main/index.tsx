import React, { useState, useEffect } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import './styles.css';
import * as apiCandidatos from '../../services/apiCandidatos';
import * as apiEleitores from '../../services/apiEleitores';

export default function Main() {
	const [eleitores, setEleitores] = useState<string[]>([]);
	const [candidatos, setCandidatos] = useState([{ id: -1, name: '', voto: false }]);
	const [loading, setLoading] = useState(false);
	const [eleitor, setEleitor] = useState('');

	useEffect(() => {
		loadData();
	}, [])

	async function loadData() {
		setLoading(true);
		eleitores.splice(0, 1);
		candidatos.splice(0, 1);

		const respEleitores = (await apiEleitores.listar()).data;
		respEleitores.forEach((eleitor) => {
			if (eleitor.isElegivel) {
				eleitores.push(eleitor.name);
			}
		})

		const respCandidatos = (await apiCandidatos.listar()).data;
		respCandidatos.forEach((candidato) => {
			candidatos.push({
				id: candidato.id ?? -1,
				name: candidato.name,
				voto: false
			});
		})
		setLoading(false);
	}

	async function handleVoto() {
		var totalVotos = 0;
		candidatos.forEach((candidato) => {
			if (candidato.voto) {
				totalVotos++;
			}
		})
		if (totalVotos < 9) {
			alert("Selecione 9 candidatos");
			return;
		}

		if (!eleitores.includes(eleitor)) {
			alert("Informe um nome válido");
			return;
		}

		try {
			candidatos.forEach(async (candidato) => {
				if (candidato.voto) {
					await apiCandidatos.votar(candidato.id, eleitor);
				}
			});
		} catch (err) {
			alert('Erro');
		}
		alert(`${eleitor}, seu voto foi computado com sucesso.`);
		window.location.reload();
	}

	const handleChange = (index: number) => {
		var newCandidatos = candidatos;
		newCandidatos[index].voto = !newCandidatos[index].voto;
		setCandidatos(newCandidatos);
	};

	return (
		<div className="main">
			<h1>Eleição</h1>
			{!loading ?
				<div>
					<section className="form-container">
						<FormControl component="fieldset" >
							<FormLabel component="legend">Selecione 9 candidatos</FormLabel>
							<FormGroup className="form-grid">
								{candidatos.length > 0 ? candidatos.map((candidato, index) => {
									return (
										<FormControlLabel
											control={<Checkbox key={index} onChange={() => handleChange(index)} name={candidato.name} />}
											label={candidato.name}
										/>
									)
								}) : <div></div>}
							</FormGroup>
						</FormControl>
						<form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<h3>Confirme seu nome</h3>
							<Autocomplete
								id="combo-box-demo"
								value={eleitor}
								onChange={(_, newValue) => {
									setEleitor(newValue ?? '');
								}}
								options={eleitores}
								getOptionLabel={(options: string) => options}
								className="autocomplete-input"
								renderInput={(params) => <TextField {...params} label="Nome" variant="outlined" />}
							/>
						</form>
						<button className="button-votar" onClick={() => handleVoto()}>Votar</button>
					</section>
					<Link className="link-text" to="/result">
						Checar Resultado
					</Link>
				</div> :

				<section className="form-container">
					<CircularProgress />
				</section>
			}
		</div>
	);
}

