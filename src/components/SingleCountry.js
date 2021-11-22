import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import BorderCountry from './BorderCountry'

// styles
import './SingleCountry.css'

export default function SingleCountry() {
	const [country, setCountry] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {

		const fetchData = async () => {
			setIsPending(true)

			try {
				const res = await fetch(`https://restcountries.com/v2/alpha/${id}`)
				if (!res.ok) {
					throw new Error(res.statusText)
				}
				const json = await res.json()

				setCountry(json)
				setIsPending(false)
				setError(null)
			} catch(err) {
				console.log(err)
			}
		}
		fetchData()
	}, [id])

	return (
		<Container fluid="xl" className="pb-5">
			<Row className="justify-content-center">
				<Col xs="11" md="12">
					<div className="single-country">
						{error && <p>{error}</p>}
						{isPending && <></>}
						{country && (
							<>
								{console.log(country)}
								<button className="btn my-5" onClick={() => history.goBack()}>Back</button>
								<Row className="align-items-center">
									<Col xs="12" md="5" lg="6">
										<img src={country.flags.svg} alt={country.name} className="img-fluid mb-5 mb-md-0" />
									</Col>
									<Col xl={{ offset: 2 }} xs="12" md>
										<h1 className="mb-4">{country.name}</h1>
										<Row>
											<Col md="6" className="mb-4">
												<p><strong>Native Name:</strong> {country.nativeName}</p>
												<p><strong>Population:</strong> {country.population}</p>
												<p><strong>Region:</strong> {country.region}</p>
												<p><strong>Sub Region:</strong> {country.subregion}</p>
												<p><strong>Captial:</strong> {country.capital}</p>
											</Col>
											<Col md="6">
												<p className="tld"><strong>Top Level Domain:</strong> {country.topLevelDomain.map(tld => <span key={tld}>{tld}</span>)}</p>
												<p className="currency"><strong>Currencies:</strong> {country.currencies.map(currency => <span key={currency.symbol}>{currency.name}</span>)}</p>
												<p className="language"><strong>Languages:</strong> {country.languages.map(lang => <span key={lang.name}>{lang.name}</span>)}</p>
											</Col>
											{country.borders && (
												<Col xs="12" className="btn-borders">
													<strong className="me-3">Border Countries:</strong>
													<div className="d-block d-md-inline">
														{country.borders.map(border => {
															return (
																<Link key={border} to={`/country/${border}`}>
																	<BorderCountry border={border} />
																</Link>
															)
														})}
													</div>
												</Col>
											)}
										</Row>
									</Col>
								</Row>
							</>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	)
}
