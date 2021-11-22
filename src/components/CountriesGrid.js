import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, CardBody, CardTitle, Input, FormGroup } from 'reactstrap'

// styles and images
import './CountriesGrid.css'
import iconSearch from '../img/icon-search.svg'

export default function CountriesGrid() {
	const [allCountries, setAllCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [error, setError] = useState(false)

	const [term, setTerm] = useState('')

	const [filter, setFilter] = useState('https://restcountries.com/v2/all')

	const handleFilter = (e) => {
		setTerm('')
		if (e.target.value === '') {
			setFilter('https://restcountries.com/v2/all')
			return
		}
		setFilter(`https://restcountries.com/v2/region/${e.target.value}`)
	}

	useEffect(() => {
		const fetchData = async () => {
			setFilteredCountries(null)
			setAllCountries(null)
			try {
				const res = await fetch(filter)
				if (!res.ok) {
					setError('No flags to load')
					throw new Error(res.statusText)
				}
				let tempArray = []
				const json = await res.json()
				Object.keys(json).forEach(function(key) {
					tempArray.push(json[key])
				})
				setAllCountries(tempArray)
				setFilteredCountries(tempArray)
			} catch(err) {
				console.log(err)
			}
		}
		fetchData()
	}, [filter])

	useEffect(() => {
		const delay = setTimeout(() => {
			setFilteredCountries(allCountries.filter(country => country.name.toLowerCase().includes(term.toLowerCase())))
		}, 750)
		return () => clearTimeout(delay)
	}, [term, allCountries])

	return (
		<Container fluid="xl" className="pb-5">
			<Row className="py-5">
				<Col md="4">
					<FormGroup className="input-group shadow-sm">
						<span className="input-group-text border-0" id="basic-addon1">
						<img src={iconSearch} alt="" />
						</span>
						<Input
							className="border-0 py-3"
							placeholder="Search for country..."
							onChange={e => setTerm(e.target.value)}
							value={term}
						/>
					</FormGroup>
				</Col>
				<Col xs="7" md={{
					size: 2,
					offset: 6
				}}>
					<FormGroup className="select">
						<select
							id="exampleSelect"
							type="select"
							className="form-select py-3 border-0 shadow-sm"
							aria-label="Default select example"
							onChange={handleFilter}
							defaultValue={filter}
							name={filter}
						>
							<option value=''>Filter by Region</option>
							<option value="africa">Africa</option>
							<option value="americas">Americas</option>
							<option value="asia">Asia</option>
							<option value="europe">Europe</option>
							<option value="oceania">Oceania</option>
						</select>
					</FormGroup>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col xs="10" md="12">
					<div className="countries-grid">
						{error && <p>{error}</p>}
						{filteredCountries && filteredCountries.map(country => (
							<div className="card" key={country.alpha2Code}>
								<img src={country.flag} alt={country.name} className="img-fluid" />
								<CardBody className="p-4 pb-5">
									<CardTitle>
										<h5 className="fw-bold mb-3">{country.name}</h5>
									</CardTitle>
									<p className="mb-0">
										<strong>Population:</strong> {country.population}<br />
										<strong>Region:</strong> {country.region}<br />
										<strong>Capital:</strong> {country.capital}
									</p>
								</CardBody>
								<Link to={`country/${country.alpha2Code}`} className="stretched-link"></Link>
							</div>
						))}
					</div>
				</Col>
			</Row>
		</Container>
	)
}
