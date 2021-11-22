import { useEffect, useState } from 'react'

const BorderCountry = ({ border }) => {
	const [country, setCountry] = useState({})

	useEffect(() => {

		const fetchData = async () => {
			const response = await fetch(`https://restcountries.com/v2/alpha/${border}`)
			const data = await response.json()
			setCountry(data)
		}
		fetchData()

	}, [border])

	return (
		<>
			{country && <button className="btn btn-sm">{country.name}</button>}
		</>
	)
}

export default BorderCountry
